import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@common/prisma';
import { UsersModule } from '../users/users.module';

import { ConversationsController } from './conversations/conversations.controller';
import { ConversationsService } from './conversations/conversations.service';
import { ConversationsRepository } from './repositories/conversations.repository';
import { CONVERSATIONS_REPOSITORY } from './interfaces/conversations-repository.interface';

import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesRepository } from './repositories/messages.repository';
import { MESSAGES_REPOSITORY } from './interfaces/messages-repository.interface';

import { MessengerGateway } from './gateway/messenger.gateway';
import { MessengerMapper } from './messenger.mapper';
import { AutoDeleteService } from './auto-delete/auto-delete.service';
import { autoDeleteS3Provider } from './auto-delete/s3-provider';
import { PresenceEngineService } from './presence/presence-engine.service';
import { WsDrainingService } from './gateway/ws-draining.service';
import { WsBackpressureService } from './gateway/ws-backpressure.service';

import { RedisModule } from '../redis/redis.module';
import { OpenGraphModule } from '../opengraph/opengraph.module';
import { MessengerLinkPreviewController } from './link-preview.controller';
import { SnowflakeModule } from '../common/id/snowflake.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    forwardRef(() => UsersModule),
    ConfigModule,
    JwtModule.register({}),
    OpenGraphModule,
    SnowflakeModule,
  ],
  controllers: [ConversationsController, MessagesController, MessengerLinkPreviewController],
  providers: [
    {
      provide: CONVERSATIONS_REPOSITORY,
      useClass: ConversationsRepository,
    },
    {
      provide: MESSAGES_REPOSITORY,
      useClass: MessagesRepository,
    },
    ConversationsService,
    MessagesService,
    MessengerMapper,
    PresenceEngineService,
    WsDrainingService,
    WsBackpressureService,
    MessengerGateway,
    AutoDeleteService,
    autoDeleteS3Provider,
  ],
  exports: [
    CONVERSATIONS_REPOSITORY,
    MESSAGES_REPOSITORY,
    ConversationsService,
    MessagesService,
    MessengerGateway,
    PresenceEngineService,
    WsDrainingService,
    WsBackpressureService,
  ],
})
export class MessengerModule {}
