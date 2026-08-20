import type { MiddlewareConsumer } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CorrelationIdMiddleware } from '../common/middleware/correlation-id.middleware';
import { MetricsMiddleware } from '../metrics/metrics.middleware';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(() => {
    appModule = new AppModule();
  });

  it('is defined', () => {
    expect(appModule).toBeDefined();
  });

  it('configures middlewares correctly on MiddlewareConsumer', () => {
    const mockForRoutes = jest.fn();
    const mockApply = jest.fn().mockReturnValue({ forRoutes: mockForRoutes });
    const mockConsumer: MiddlewareConsumer = {
      apply: mockApply,
    };

    appModule.configure(mockConsumer);

    expect(mockApply).toHaveBeenCalledWith(CorrelationIdMiddleware, MetricsMiddleware);
    expect(mockForRoutes).toHaveBeenCalledWith('*');
  });
});
