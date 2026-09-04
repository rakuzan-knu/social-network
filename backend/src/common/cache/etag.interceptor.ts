import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHash } from 'node:crypto';

export interface ETagOptions {
  weak?: boolean;
  cacheControl?: string;
}

function toPrimitiveString(val: unknown): string {
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (val instanceof Date) {
    return val.toISOString();
  }
  return '';
}

export function generateETag(payload: unknown, weak = true): string {
  if (payload === null || payload === undefined) {
    return weak ? 'W/"0"' : '"0"';
  }

  let raw = '';
  if (typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    // Fast path: if updated_at or updatedAt exists, incorporate it with entity id
    if (obj.updatedAt || obj.updated_at) {
      const id = toPrimitiveString(obj.id);
      const updated = toPrimitiveString(obj.updatedAt ?? obj.updated_at);
      raw = `${id}:${updated}`;
    } else {
      raw = JSON.stringify(payload);
    }
  } else if (
    typeof payload === 'string' ||
    typeof payload === 'number' ||
    typeof payload === 'boolean'
  ) {
    raw = String(payload);
  } else {
    raw = '';
  }

  const hash = createHash('sha1').update(raw).digest('base64url');
  return weak ? `W/"${hash}"` : `"${hash}"`;
}

export function isETagMatch(ifNoneMatchHeader: string | undefined, currentETag: string): boolean {
  if (!ifNoneMatchHeader) return false;

  const trimmed = ifNoneMatchHeader.trim();
  if (trimmed === '*') return true;

  const normalizedCurrent = currentETag.replace(/^W\//, '');
  const candidateTags = trimmed.split(',').map((t) => t.trim().replace(/^W\//, ''));

  return candidateTags.includes(normalizedCurrent);
}

@Injectable()
export class ETagInterceptor implements NestInterceptor {
  constructor(
    private readonly options: ETagOptions = {
      weak: true,
      cacheControl: 'private, no-cache',
    },
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    // ETags apply strictly to safe idempotent GET / HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        // If handler already handled or responded, pass through
        if (res.headersSent || data === undefined) {
          return data;
        }

        const etag = generateETag(data, this.options.weak ?? true);
        const cacheControl = this.options.cacheControl ?? 'private, no-cache';

        res.setHeader('ETag', etag);
        if (!res.getHeader('Cache-Control')) {
          res.setHeader('Cache-Control', cacheControl);
        }

        const ifNoneMatch = req.headers['if-none-match'];
        if (ifNoneMatch && isETagMatch(ifNoneMatch, etag)) {
          res.status(HttpStatus.NOT_MODIFIED);
          // Return null / empty for 304 to avoid serialization & transfer overhead
          return null;
        }

        return data;
      }),
    );
  }
}

/**
 * Decorator to easily enable ETag conditional caching on controllers or individual endpoints.
 */
export function ConditionalHttpCache(options?: ETagOptions) {
  return applyDecorators(UseInterceptors(new ETagInterceptor(options)));
}
