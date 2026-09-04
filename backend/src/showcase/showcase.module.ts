import { Module } from '@nestjs/common';
import { ShowcaseController } from './showcase.controller';
import { ShowcaseService } from './showcase.service';
import { MediaProxyService } from './media-proxy.service';
import { PrismaModule } from '@common/prisma';
import { RedisModule } from '../redis/redis.module';
import { SHOWCASE_REPOSITORY } from './interfaces/showcase-repository.interface';
import { ShowcaseRepository } from './repositories/showcase.repository';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [ShowcaseController],
  providers: [
    ShowcaseService,
    MediaProxyService,
    {
      provide: SHOWCASE_REPOSITORY,
      useClass: ShowcaseRepository,
    },
  ],
  exports: [ShowcaseService, MediaProxyService],
})
export class ShowcaseModule {}
