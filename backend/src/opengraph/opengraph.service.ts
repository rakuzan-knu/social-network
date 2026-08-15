import { Injectable, Logger } from '@nestjs/common';
import * as dns from 'dns';
import * as net from 'net';
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
const MAX_REDIRECT_HOPS = 3;
const ALLOWED_PORTS = new Set([80, 443, 8080, 8443]);

export function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split('.').map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return true; // invalid -> treat as unsafe
  }
  const [b0, b1, b2] = parts;

  // 0.0.0.0/8 (Current network)
  if (b0 === 0) return true;
  // 10.0.0.0/8 (Private network)
  if (b0 === 10) return true;
  // 100.64.0.0/10 (Shared Address Space / CGNAT 100.64.0.0 - 100.127.255.255)
  if (b0 === 100 && b1 >= 64 && b1 <= 127) return true;
  // 127.0.0.0/8 (Loopback)
  if (b0 === 127) return true;
  // 169.254.0.0/16 (Link-local / AWS/GCP/Azure Metadata 169.254.169.254)
  if (b0 === 169 && b1 === 254) return true;
  // 172.16.0.0/12 (Private network 172.16.0.0 - 172.31.255.255)
  if (b0 === 172 && b1 >= 16 && b1 <= 31) return true;
  // 192.0.0.0/24 (IETF Protocol Assignments)
  if (b0 === 192 && b1 === 0 && b2 === 0) return true;
  // 192.0.2.0/24 (TEST-NET-1)
  if (b0 === 192 && b1 === 0 && b2 === 2) return true;
  // 192.88.99.0/24 (6to4 Relay Anycast)
  if (b0 === 192 && b1 === 88 && b2 === 99) return true;
  // 192.168.0.0/16 (Private network)
  if (b0 === 192 && b1 === 168) return true;
  // 198.18.0.0/15 (Network Interconnect Device Benchmark Testing 198.18.0.0 - 198.19.255.255)
  if (b0 === 198 && (b1 === 18 || b1 === 19)) return true;
  // 198.51.100.0/24 (TEST-NET-2)
  if (b0 === 198 && b1 === 51 && b2 === 100) return true;
  // 203.0.113.0/24 (TEST-NET-3)
  if (b0 === 203 && b1 === 0 && b2 === 113) return true;
  // 224.0.0.0/4 (Multicast 224.0.0.0 - 239.255.255.255)
  if (b0 >= 224 && b0 <= 239) return true;
  // 240.0.0.0/4 (Reserved / Future Use 240.0.0.0 - 255.255.255.254)
  if (b0 >= 240) return true;

  return false;
}

export function isPrivateIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase().trim();

  // IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1)
  if (normalized.startsWith('::ffff:')) {
    const v4Part = normalized.replace('::ffff:', '');
    if (net.isIPv4(v4Part)) {
      return isPrivateIPv4(v4Part);
    }
  }

  // :: or ::1 (Unspecified / Loopback)
  if (
    normalized === '::' ||
    normalized === '::1' ||
    normalized === '0:0:0:0:0:0:0:1' ||
    normalized === '0:0:0:0:0:0:0:0'
  ) {
    return true;
  }

  // Unique Local Address (fc00::/7 -> fc00: to fdff:)
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) {
    return true;
  }

  // Link-Local Unicast (fe80::/10 -> fe80: to febf:)
  if (/^fe[89ab]/i.test(normalized)) {
    return true;
  }

  // Multicast (ff00::/8)
  if (normalized.startsWith('ff')) {
    return true;
  }

  // Discard / Documentation / 6to4
  if (
    normalized.startsWith('100::') ||
    normalized.startsWith('2001:db8:') ||
    normalized.startsWith('2002:')
  ) {
    return true;
  }

  return false;
}

export function isPrivateOrForbiddenIp(ip: string): boolean {
  const ipVersion = net.isIP(ip);
  if (ipVersion === 4) {
    return isPrivateIPv4(ip);
  }
  if (ipVersion === 6) {
    return isPrivateIPv6(ip);
  }
  return true; // Not a valid IP -> treat as forbidden
}

@Injectable()
export class OpenGraphService {
  private readonly logger = new Logger(OpenGraphService.name);

  constructor(private readonly redisService: RedisService) {}

  /**
   * SSRF Protection: Validates URL protocol, ports, user credentials, hostname, and all resolved IPs.
   */
  async validateUrlForSsrf(parsedUrl: URL): Promise<boolean> {
    // 1. Strict Protocol Check
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }

    // 2. Reject credentials in URL (e.g. http://user:pass@host)
    if (parsedUrl.username || parsedUrl.password) {
      return false;
    }

    // 3. Port Whitelisting (Default 80/443 or safe web ports)
    if (parsedUrl.port) {
      const port = parseInt(parsedUrl.port, 10);
      if (isNaN(port) || !ALLOWED_PORTS.has(port)) {
        return false;
      }
    }

    const hostname = parsedUrl.hostname.toLowerCase().trim();
    if (!hostname) return false;

    // 4. Block local/internal hostnames
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.lan') ||
      hostname.endsWith('.home') ||
      hostname.endsWith('.corp')
    ) {
      return false;
    }

    // 5. If hostname is directly an IP literal
    if (net.isIP(hostname)) {
      return !isPrivateOrForbiddenIp(hostname);
    }

    // 6. DNS Pinning & Resolution: Verify EVERY resolved IP address
    try {
      const addresses = await dns.promises.lookup(hostname, { all: true, verbatim: true });
      if (!addresses || addresses.length === 0) {
        return false;
      }

      for (const addr of addresses) {
        if (isPrivateOrForbiddenIp(addr.address)) {
          return false;
        }
      }
    } catch {
      // DNS resolution failed -> unsafe/dead domain
      return false;
    }

    return true;
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
    } catch {
      return null;
    }

    const isInitialSafe = await this.validateUrlForSsrf(parsedUrl);
    if (!isInitialSafe) {
      return null;
    }

    const cacheKey = `og:preview:${parsedUrl.href}`;
    try {
      const cached = await this.redisService.get(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as Record<string, unknown>;
        if (parsed.notFound === true) {
          return null; // Negative cache hit
        }
        return parsed as unknown as OpenGraphMetadata;
      }
    } catch (e) {
      this.logger.warn(`Redis get failed for ${cacheKey}: ${String(e)}`);
    }

    try {
      let currentUrl = parsedUrl;
      let redirectCount = 0;
      let response: Response | null = null;

      // Safe fetch loop with manual redirect verification to prevent SSRF via 302
      while (redirectCount <= MAX_REDIRECT_HOPS) {
        const isSafe = await this.validateUrlForSsrf(currentUrl);
        if (!isSafe) {
          await this.setNegativeCache(cacheKey, parsedUrl.href);
          return null;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        try {
          response = await fetch(currentUrl.href, {
            signal: controller.signal,
            redirect: 'manual', // Prevent automatic following to private addresses
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (compatible; SocialBot/1.0)',
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
          });
        } finally {
          clearTimeout(timeoutId);
        }

        // Handle Redirects
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get('location');
          if (!location) {
            await this.setNegativeCache(cacheKey, parsedUrl.href);
            return null;
          }

          redirectCount++;
          if (redirectCount > MAX_REDIRECT_HOPS) {
            await this.setNegativeCache(cacheKey, parsedUrl.href);
            return null;
          }

          try {
            currentUrl = new URL(location, currentUrl.href);
          } catch {
            await this.setNegativeCache(cacheKey, parsedUrl.href);
            return null;
          }
          continue;
        }

        break;
      }

      if (!response || !response.ok) {
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
          image = new URL(image, currentUrl.href).href;
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
        currentUrl.hostname.replace(/^www\./, '');

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
          favicon = new URL(favicon, currentUrl.href).href;
        } catch {
          favicon = `${currentUrl.origin}/favicon.ico`;
        }
      } else if (!favicon) {
        favicon = `${currentUrl.origin}/favicon.ico`;
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

  /**
   * Decodes HTML entities safely in a single pass without double-unescaping vulnerabilities.
   */
  private cleanHtmlEntities(str: string): string {
    const entityMap: Record<string, string> = {
      '&quot;': '"',
      '&#34;': '"',
      '&apos;': "'",
      '&#39;': "'",
      '&#x27;': "'",
      '&lt;': '<',
      '&#60;': '<',
      '&gt;': '>',
      '&#62;': '>',
      '&nbsp;': ' ',
      '&#160;': ' ',
      '&amp;': '&',
      '&#38;': '&',
    };

    return str
      .replace(
        /&(?:quot|apos|lt|gt|nbsp|amp|#34|#39|#x27|#60|#62|#160|#38);/gi,
        (match) => entityMap[match.toLowerCase()] ?? match,
      )
      .trim();
  }
}
