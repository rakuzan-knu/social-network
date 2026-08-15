import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

export interface OpenGraphMetadata {
  url: string;
  siteName: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
}

const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60; // 604800 seconds
const NEGATIVE_CACHE_SECONDS = 60 * 60; // 1 hour for dead/unreachable URLs
const MAX_BUFFER_BYTES = 512 * 1024; // 512 KB max limit (stops memory OOM)

@Injectable()
export class OpenGraphService {
  private readonly logger = new Logger(OpenGraphService.name);

  constructor(private readonly redisService: RedisService) {}

  private isPrivateOrInvalidHost(host: string): boolean {
    const lower = host.toLowerCase();
    if (
      lower === 'localhost' ||
      lower.endsWith('.local') ||
      lower === '127.0.0.1' ||
      lower === '0.0.0.0' ||
      lower === '::1' ||
      lower === '169.254.169.254' ||
      lower.startsWith('10.') ||
      lower.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(lower)
    ) {
      return true;
    }
    return false;
  }

  private async setNegativeCache(cacheKey: string, url: string): Promise<void> {
    try {
      await this.redisService.set(
        cacheKey,
        JSON.stringify({ notFound: true, url }),
        NEGATIVE_CACHE_SECONDS,
      );
    } catch {
      // ignore cache set error
    }
  }

  async extractMetadata(targetUrl: string): Promise<OpenGraphMetadata | null> {
    if (!targetUrl || typeof targetUrl !== 'string') return null;

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl.trim());
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return null;
      }
      if (this.isPrivateOrInvalidHost(parsedUrl.hostname)) {
        return null;
      }
    } catch {
      return null;
    }

    const cacheKey = `og:preview:${parsedUrl.href}`;
    try {
      const cached = await this.redisService.get(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as Record<string, unknown>;
        if (parsed.notFound === true) {
          return null; // Negative cache hit: dead or invalid URL
        }
        return parsed as unknown as OpenGraphMetadata;
      }
    } catch (e) {
      this.logger.warn(`Redis get failed for ${cacheKey}: ${String(e)}`);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(parsedUrl.href, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (compatible; SocialBot/1.0)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.setNegativeCache(cacheKey, parsedUrl.href);
        return null;
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
        // Abort stream immediately without reading large binary files (video/zip/etc.)
        try {
          await response.body?.cancel();
        } catch {
          // Stream cancel cleanup
        }
        await this.setNegativeCache(cacheKey, parsedUrl.href);
        return null;
      }

      // Stream up to 512 KB or until </head> tag is encountered to prevent OOM
      let html = '';
      const reader = response.body?.getReader();
      if (reader) {
        let totalBytes = 0;
        const decoder = new TextDecoder('utf-8');
        while (totalBytes < MAX_BUFFER_BYTES) {
          const { done, value } = await reader.read();
          if (done || !value) break;
          totalBytes += value.byteLength;
          html += decoder.decode(value, { stream: true });
          if (html.includes('</head>') || html.includes('</HEAD>')) {
            break;
          }
        }
        try {
          await reader.cancel();
        } catch {
          // Reader cancel cleanup
        }
      } else {
        const rawText = await response.text();
        html = rawText.slice(0, MAX_BUFFER_BYTES);
      }

      const title =
        this.extractMetaContent(html, /property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
        this.extractMetaContent(html, /content=["']([^"']+)["']\s+property=["']og:title["']/i) ||
        this.extractMetaContent(html, /name=["']twitter:title["']\s+content=["']([^"']+)["']/i) ||
        this.extractTagContent(html, /<title[^>]*>([^<]+)<\/title>/i);

      const description =
        this.extractMetaContent(
          html,
          /property=["']og:description["']\s+content=["']([^"']+)["']/i,
        ) ||
        this.extractMetaContent(
          html,
          /content=["']([^"']+)["']\s+property=["']og:description["']/i,
        ) ||
        this.extractMetaContent(
          html,
          /name=["']twitter:description["']\s+content=["']([^"']+)["']/i,
        ) ||
        this.extractMetaContent(html, /name=["']description["']\s+content=["']([^"']+)["']/i);

      let image =
        this.extractMetaContent(html, /property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
        this.extractMetaContent(html, /content=["']([^"']+)["']\s+property=["']og:image["']/i) ||
        this.extractMetaContent(html, /name=["']twitter:image["']\s+content=["']([^"']+)["']/i);

      if (image && !image.startsWith('http://') && !image.startsWith('https://')) {
        try {
          image = new URL(image, parsedUrl.href).href;
        } catch {
          image = null;
        }
      }

      const siteName =
        this.extractMetaContent(
          html,
          /property=["']og:site_name["']\s+content=["']([^"']+)["']/i,
        ) ||
        this.extractMetaContent(
          html,
          /content=["']([^"']+)["']\s+property=["']og:site_name["']/i,
        ) ||
        parsedUrl.hostname.replace(/^www\./, '');

      let favicon =
        this.extractMetaContent(
          html,
          /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i,
        ) ||
        this.extractMetaContent(
          html,
          /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:shortcut )?icon["']/i,
        );

      if (favicon && !favicon.startsWith('http://') && !favicon.startsWith('https://')) {
        try {
          favicon = new URL(favicon, parsedUrl.href).href;
        } catch {
          favicon = `${parsedUrl.origin}/favicon.ico`;
        }
      } else if (!favicon) {
        favicon = `${parsedUrl.origin}/favicon.ico`;
      }

      if (!title && !description && !image) {
        await this.setNegativeCache(cacheKey, parsedUrl.href);
        return null;
      }

      const result: OpenGraphMetadata = {
        url: parsedUrl.href,
        siteName: siteName ? this.cleanHtmlEntities(siteName) : null,
        title: title ? this.cleanHtmlEntities(title) : null,
        description: description ? this.cleanHtmlEntities(description) : null,
        image: image || null,
        favicon: favicon || null,
      };

      // Store in Redis with 7-day TTL
      void this.redisService.set(cacheKey, JSON.stringify(result), SEVEN_DAYS_SECONDS);

      return result;
    } catch (err) {
      this.logger.debug(`Failed to fetch OG metadata for ${targetUrl}: ${(err as Error).message}`);
      await this.setNegativeCache(cacheKey, parsedUrl.href);
      return null;
    }
  }

  private extractMetaContent(html: string, regex: RegExp): string | null {
    const match = html.match(regex);
    return match && match[1] ? match[1].trim() : null;
  }

  private extractTagContent(html: string, regex: RegExp): string | null {
    const match = html.match(regex);
    return match && match[1] ? match[1].trim() : null;
  }

  private cleanHtmlEntities(str: string): string {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .trim();
  }
}
