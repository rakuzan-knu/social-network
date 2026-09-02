import { Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';

export interface ErrorResponseFormat {
  statusCode: number;
  errorCode: string;
  error?: string;
  message: string | string[];
  timestamp: string;
  path: string;
  traceId: string;
}

const STATUS_CODE_TO_ERROR_CODE: Record<number, string> = {
  [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
  [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
  [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
  [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
  [HttpStatus.CONFLICT]: 'CONFLICT',
  [HttpStatus.GONE]: 'GONE',
  [HttpStatus.PAYLOAD_TOO_LARGE]: 'PAYLOAD_TOO_LARGE',
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'UNPROCESSABLE_ENTITY',
  [HttpStatus.TOO_MANY_REQUESTS]: 'TOO_MANY_REQUESTS',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
  [HttpStatus.BAD_GATEWAY]: 'BAD_GATEWAY',
  [HttpStatus.SERVICE_UNAVAILABLE]: 'SERVICE_UNAVAILABLE',
  [HttpStatus.GATEWAY_TIMEOUT]: 'GATEWAY_TIMEOUT',
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    if (!httpAdapter) {
      this.logger.error('HttpAdapter is not initialized');
      return;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const path = String(httpAdapter.getRequestUrl(request));
    const traceId = (request?.traceId ||
      request?.correlationId ||
      request?.headers?.['x-trace-id'] ||
      request?.headers?.['x-correlation-id'] ||
      request?.headers?.['x-request-id'] ||
      randomUUID()) as string;

    const isProduction = process.env.NODE_ENV === 'production';

    let httpStatus = Number(HttpStatus.INTERNAL_SERVER_ERROR);
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let errorMessage: string | string[] = 'An unexpected error occurred';
    let errorName = 'InternalServerError';

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      errorName = exception.name;
      errorCode = STATUS_CODE_TO_ERROR_CODE[httpStatus] || 'HTTP_ERROR';

      const res = exception.getResponse();

      if (typeof res === 'string') {
        errorMessage = res;
      } else if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, unknown>;

        if (typeof resObj.errorCode === 'string' && resObj.errorCode.trim()) {
          errorCode = resObj.errorCode.trim();
        } else if (typeof resObj.error === 'string' && resObj.error.trim()) {
          errorCode = resObj.error.trim().toUpperCase().replace(/\s+/g, '_');
        }

        if (typeof resObj.message === 'string') {
          errorMessage = resObj.message;
        } else if (Array.isArray(resObj.message)) {
          errorMessage = resObj.message.filter((msg): msg is string => typeof msg === 'string');
        } else {
          errorMessage = exception.message;
        }
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Map known database errors without exposing SQL/schema internals
      if (exception.code === 'P2002') {
        httpStatus = HttpStatus.CONFLICT;
        errorCode = 'CONFLICT';
        errorMessage = 'Resource already exists';
        errorName = 'ConflictError';
      } else if (exception.code === 'P2025') {
        httpStatus = HttpStatus.NOT_FOUND;
        errorCode = 'NOT_FOUND';
        errorMessage = 'Resource not found';
        errorName = 'NotFoundError';
      } else if (exception.code === 'P2003') {
        httpStatus = HttpStatus.BAD_REQUEST;
        errorCode = 'BAD_REQUEST';
        errorMessage = 'Invalid relation reference';
        errorName = 'BadRequestError';
      } else {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        errorCode = 'INTERNAL_SERVER_ERROR';
        errorMessage = 'An unexpected database error occurred';
        errorName = 'DatabaseError';
      }
    } else if (
      exception instanceof Prisma.PrismaClientValidationError ||
      exception instanceof Prisma.PrismaClientUnknownRequestError ||
      exception instanceof Prisma.PrismaClientRustPanicError ||
      exception instanceof Prisma.PrismaClientInitializationError
    ) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      errorCode = 'INTERNAL_SERVER_ERROR';
      errorMessage = 'An unexpected database error occurred';
      errorName = 'DatabaseError';
    } else if (exception instanceof Error) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      errorCode = 'INTERNAL_SERVER_ERROR';
      errorMessage = isProduction ? 'An unexpected error occurred' : exception.message;
      errorName = 'InternalServerError';
    }

    if (httpStatus >= Number(HttpStatus.INTERNAL_SERVER_ERROR)) {
      this.logger.error(
        `[${request.method}] ${path} [traceId: ${traceId}] - Status: ${httpStatus} - Error: ${errorCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `[${request.method}] ${path} [traceId: ${traceId}] - Status: ${httpStatus} - Code: ${errorCode}`,
      );
    }

    const responseBody: ErrorResponseFormat = {
      statusCode: httpStatus,
      errorCode,
      error: errorName,
      message: errorMessage,
      timestamp: new Date().toISOString(),
      path,
      traceId,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
