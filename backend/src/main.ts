import fastifyCompress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import { type INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { type Request, type Response } from 'express';
import { Logger as PinoLogger } from 'nestjs-pino';
import * as zlib from 'zlib';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './common/adapters/redis-io.adapter';
import { setupGracefulShutdown } from './common/lifecycle/graceful-shutdown';
import { setupFdGuard } from './common/lifecycle/fd-guard';
import './instrument';

const logger = new Logger('Bootstrap');

if (!process.env.DIRECT_URL && process.env.DATABASE_URL) {
  process.env.DIRECT_URL = process.env.DATABASE_URL;
}

let cachedApp: INestApplication | undefined;

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    trustProxy: 1,
    bodyLimit: 10485760,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, {
    bufferLogs: true,
  });
  app.useLogger(app.get(PinoLogger));

  setupFdGuard(app);

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  await app.register(fastifyCookie);

  await app.register(fastifyCompress, {
    threshold: 1024,
    encodings: ['br', 'gzip', 'deflate'],
    brotliOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
      },
    },
    zlibOptions: {
      level: 6,
    },
  });

  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 100 * 1024 * 1024,
      files: 10,
    },
    attachFieldsToBody: false,
  });

  setupApiVersioning(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:3000'];

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  });

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis(process.env.REDIS_URL);
  app.useWebSocketAdapter(redisIoAdapter);

  const config = new DocumentBuilder()
    .setTitle('Social Network API')
    .setDescription(
      'Social Network backend API documentation with RFC 8594 Deprecation & Versioning',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableShutdownHooks();
  setupGracefulShutdown(app, redisIoAdapter);

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`Server running on port ${port}`);
}

function setupApiVersioning(app: NestFastifyApplication): void {
  if (typeof app.enableVersioning === 'function') {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
  }

  const httpAdapter = typeof app.getHttpAdapter === 'function' ? app.getHttpAdapter() : undefined;
  const fastifyRaw = httpAdapter?.getInstance?.() as unknown as {
    addHook?: (
      hook: string,
      fn: (
        req: { raw: { url?: string }; headers: Record<string, string | string[] | undefined> },
        reply: unknown,
      ) => Promise<void>,
    ) => void;
  };

  if (fastifyRaw && typeof fastifyRaw.addHook === 'function') {
    fastifyRaw.addHook('onRequest', (req) => {
      const rawUrl = req.raw.url || '';
      const [pathOnly, query] = rawUrl.split('?');
      if (
        pathOnly &&
        !pathOnly.startsWith('/v1') &&
        !pathOnly.startsWith('/v2') &&
        !pathOnly.startsWith('/health') &&
        !pathOnly.startsWith('/metrics') &&
        !pathOnly.startsWith('/ping') &&
        !pathOnly.startsWith('/api/docs') &&
        !pathOnly.startsWith('/socket.io') &&
        !pathOnly.startsWith('/favicon.ico')
      ) {
        req.raw.url = `/v1${pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`}${query ? `?${query}` : ''}`;
        req.headers['x-legacy-unversioned'] = 'true';
      }
      return Promise.resolve();
    });
  }
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  void bootstrap();
}

// Vercel Serverless Handler
export default async function handler(req: Request, res: Response): Promise<void> {
  if (!cachedApp) {
    const fastifyAdapter = new FastifyAdapter({
      trustProxy: 1,
      bodyLimit: 10485760,
    });
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, {
      bufferLogs: true,
    });
    app.useLogger(app.get(PinoLogger));
    await app.register(fastifyHelmet, { contentSecurityPolicy: false });
    await app.register(fastifyCookie);
    await app.register(fastifyCompress, {
      threshold: 1024,
      encodings: ['br', 'gzip', 'deflate'],
    });
    await app.register(fastifyMultipart, {
      limits: { fileSize: 100 * 1024 * 1024, files: 10 },
      attachFieldsToBody: false,
    });
    setupApiVersioning(app);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.enableCors({
      origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? '*',
      credentials: true,
    });
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis(process.env.REDIS_URL);
    app.useWebSocketAdapter(redisIoAdapter);
    await app.init();
    await (app.getHttpAdapter().getInstance() as unknown as { ready: () => Promise<void> }).ready();
    cachedApp = app;
  }
  const fastifyInstance = cachedApp.getHttpAdapter().getInstance() as unknown as {
    server: { emit: (e: string, req: unknown, res: unknown) => void };
  };
  fastifyInstance.server.emit('request', req, res);
}
