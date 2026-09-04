import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = process.hrtime.bigint();
    const route =
      (req.route as { path?: string } | undefined)?.path ||
      req.path ||
      (req as unknown as { raw?: { url?: string } }).raw?.url ||
      req.url;
    const method = req.method;

    let recorded = false;
    const record = () => {
      if (recorded) return;
      recorded = true;
      const duration = Number(process.hrtime.bigint() - startTime) / 1_000_000;
      const statusCode = res.statusCode || 200;

      this.metricsService.recordHttpRequest(method, route, statusCode, duration);
      if (statusCode >= 400) {
        this.metricsService.recordHttpError(method, route, statusCode);
      }
    };

    if (typeof res.on === 'function') {
      res.on('finish', record);
      res.on('close', record);
    } else if (
      typeof (res as unknown as { raw?: { on?: (e: string, fn: () => void) => void } }).raw?.on ===
      'function'
    ) {
      (res as unknown as { raw: { on: (e: string, fn: () => void) => void } }).raw.on(
        'finish',
        record,
      );
      (res as unknown as { raw: { on: (e: string, fn: () => void) => void } }).raw.on(
        'close',
        record,
      );
    }

    if (typeof res.send === 'function') {
      const originalSend = res.send.bind(res);
      res.send = (data: unknown) => {
        record();
        res.send = originalSend;
        return originalSend(data);
      };
    }

    next();
  }
}
