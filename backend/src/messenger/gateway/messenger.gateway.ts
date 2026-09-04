import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import {
  Logger,
  UseFilters,
  UseInterceptors,
  forwardRef,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WS_EVENTS } from '../events/ws-events';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from '../conversations/conversations.service';
import { RedisService } from '../../redis/redis.service';
import { UsersService } from '../../users/users.service';
import { VisibilityResolver } from '../../users/privacy/visibility.resolver';
import { PrivacyDimension } from '@prisma/client';
import { WsValidationFilter } from '../filters/ws-validation.filter';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { safeJsonParse } from '../../common/utils/json.util';
import { z } from 'zod';
import {
  type SendMessageDto,
  type EditMessageDto,
  type DeleteMessageDto,
  type ForwardMessageDto,
  type ReactToMessageDto,
  type TogglePinMessageDto,
  type ConversationIdDto,
  type MarkReadDto,
  type GetOnlineStatusDto,
  type GatewayResumeDto,
  type MessageDeliveredDto,
  type ClientHibernateDto,
  conversationIdSchema,
  deleteMessageSchema,
  editMessageSchema,
  forwardMessageSchema,
  gatewayResumeSchema,
  getOnlineStatusSchema,
  markReadSchema,
  messageDeliveredSchema,
  clientHibernateSchema,
  reactToMessageSchema,
  sendMessageSchema,
  togglePinMessageSchema,
} from '@common/contracts';

import { QueueService } from '../../queue/queue.service';
import { MessageJobType, SearchJobType } from '../../queue/queue.constants';
import { TraceContext } from '../../common/tracing/trace-context';
import { WsTraceInterceptor } from '../../common/tracing/ws-trace.interceptor';
import { randomUUID } from 'node:crypto';
import { MetricsService } from '../../metrics/metrics.service';
import { PresenceEngineService } from '../presence/presence-engine.service';
import { WsDrainingService, type DrainOptions } from './ws-draining.service';
import { WsBackpressureService, type EventPriority } from './ws-backpressure.service';
import { typingEventPool, readReceiptPool } from './ws-event-pools';
import { buildWsFrameString } from '../../common/v8/zero-alloc-parser';
import { makeWsEvent } from '../../common/v8/shape-stable';

interface AuthenticatedSocket extends Socket {
  userId: string;
  traceId?: string | undefined;
}

const getCorsOrigin = () => {
  const envOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : [];
  return (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (
      !origin ||
      envOrigins.includes(origin) ||
      origin.startsWith('http://localhost:') ||
      origin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  };
};

@UseFilters(WsValidationFilter)
@UseInterceptors(WsTraceInterceptor)
@WebSocketGateway({
  namespace: '/messenger',
  cors: {
    origin: getCorsOrigin(),
    credentials: true,
  },
  pingInterval: 10_000,
  pingTimeout: 5_000,
  maxHttpBufferSize: 1_000_000,
})
export class MessengerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit, OnModuleDestroy
{
  @WebSocketServer()
  private readonly server!: Server;

  private readonly logger = new Logger(MessengerGateway.name);
  private readonly onlineUsers = new Map<string, Set<string>>();
  private readonly socketTimers = new Map<string, Set<NodeJS.Timeout>>();

  private readonly RATE_LIMIT = 20;
  private readonly RATE_WINDOW_MS = 10_000;

  onModuleInit(): void {
    this.logger.log('MessengerGateway initialized');
  }

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly messagesService: MessagesService,
    private readonly convsService: ConversationsService,
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => VisibilityResolver))
    private readonly visibility: VisibilityResolver,
    @Optional()
    private readonly queueService?: QueueService,
    @Optional()
    private readonly metricsService?: MetricsService,
    @Optional()
    private readonly presenceEngine?: PresenceEngineService,
    @Optional()
    private readonly drainingService?: WsDrainingService,
    @Optional()
    private readonly backpressureService?: WsBackpressureService,
  ) {}

  afterInit() {
    if (this.presenceEngine && this.server) {
      this.presenceEngine.setServer(this.server);
    }
    this.logger.log(`Messenger WebSocket Gateway initialised.`);
  }

  registerSocketTimer(socketId: string, timer: NodeJS.Timeout): NodeJS.Timeout {
    if (!this.socketTimers.has(socketId)) {
      this.socketTimers.set(socketId, new Set());
    }
    this.socketTimers.get(socketId)!.add(timer);
    return timer;
  }

  clearSocketTimers(socketId: string): void {
    const timers = this.socketTimers.get(socketId);
    if (timers) {
      for (const timer of timers) {
        clearTimeout(timer);
      }
      this.socketTimers.delete(socketId);
    }
  }

  onModuleDestroy(): void {
    for (const [socketId] of this.socketTimers) {
      this.clearSocketTimers(socketId);
    }
    this.socketTimers.clear();
    this.onlineUsers.clear();
    try {
      this.server?.disconnectSockets?.(true);
    } catch {
      // ignore on teardown
    }
  }

  async drainSockets(options?: DrainOptions): Promise<void> {
    if (this.drainingService) {
      await this.drainingService.drainSockets(this.server, options);
    } else {
      this.server?.disconnectSockets?.(true);
    }
  }

  async handleConnection(client: Socket): Promise<void> {
    if (this.drainingService?.isDraining) {
      client.emit(WS_EVENTS.RECONNECT_WITH_BACKOFF, {
        reconnectAfterMs: Math.floor(Math.random() * 5000) + 1000,
        reason: 'server_shutdown',
      });
      client.disconnect(true);
      return;
    }

    const rawTraceId =
      client.handshake.headers['x-trace-id'] ||
      client.handshake.headers['x-correlation-id'] ||
      (client.handshake.auth?.traceId as string | undefined);
    const traceId = (Array.isArray(rawTraceId) ? rawTraceId[0] : rawTraceId) || randomUUID();
    (client as AuthenticatedSocket).traceId = traceId;

    await TraceContext.run(
      {
        traceId,
        correlationId: traceId,
        reqMethod: 'WS_CONNECT',
        reqUrl: '/messenger',
      },
      async () => {
        try {
          const token = this.extractToken(client);
          if (!token) throw new WsException('Missing auth token');

          const payload = await this.jwtService.verifyAsync<{ sub: string; type: string }>(token, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET') || '',
          });

          if (payload.type !== 'access') throw new WsException('Invalid token type');

          const userId = payload.sub;
          (client as AuthenticatedSocket).userId = userId;
          TraceContext.setUserId(userId);

          // Join user room for cross-instance Pub/Sub broadcasting via Redis Adapter
          await client.join(`user:${userId}`);

          const wasOffline = this.presenceEngine
            ? this.presenceEngine.recordUserOnline(userId, client.id)
            : !this.onlineUsers.has(userId);

          if (!this.onlineUsers.has(userId)) this.onlineUsers.set(userId, new Set());
          this.onlineUsers.get(userId)!.add(client.id);

          // Track in Redis Socket Set for Multi-Tab Presence
          await this.redisService.sadd(`user:sockets:${userId}`, client.id).catch(() => {});
          await this.redisService.expire(`user:sockets:${userId}`, 86400).catch(() => {});
          await this.redisService.set(`user:presence:${userId}`, 'online', 60).catch(() => {});

          if (wasOffline && !this.presenceEngine) {
            await this.emitPresenceExceptBlocked(userId, WS_EVENTS.USER_ONLINE, { userId });
          }

          const seqRaw = await this.redisService.get(`user:seq:${userId}`).catch(() => '0');
          const currentSeq = Number(seqRaw || '0') | 0;
          client.emit(WS_EVENTS.GATEWAY_READY, { sessionId: client.id, seq: currentSeq });

          this.metricsService?.incrementActiveConnections();
          this.logger.log(`Client connected: ${client.id} (user: ${userId})`);
        } catch (err) {
          this.logger.warn(`Rejected connection: ${(err as Error).message}`);
          client.disconnect(true);
        }
      },
    );
  }

  async handleDisconnect(client: Socket): Promise<void> {
    const traceId = (client as AuthenticatedSocket).traceId || randomUUID();
    const userId = (client as AuthenticatedSocket).userId;

    await TraceContext.run(
      {
        traceId,
        correlationId: traceId,
        userId,
        reqMethod: 'WS_DISCONNECT',
        reqUrl: '/messenger',
      },
      async () => {
        this.clearSocketTimers(client.id);
        this.backpressureService?.cleanupSocket(client.id);
        try {
          client.removeAllListeners();
        } catch {
          // ignore
        }

        if (!userId) return;

        const userSockets = this.onlineUsers.get(userId);
        if (userSockets) {
          userSockets.delete(client.id);
          if (userSockets.size === 0) {
            this.onlineUsers.delete(userId);
          }
        }

        if (this.presenceEngine) {
          this.presenceEngine.recordUserOffline(userId, client.id);
        }

        await this.redisService.srem(`user:sockets:${userId}`, client.id).catch(() => {});
        const remainingSockets = await this.redisService
          .scard(`user:sockets:${userId}`)
          .catch(() => 0);

        // Only switch to offline if all tabs / sockets are closed
        if ((!userSockets || userSockets.size === 0) && remainingSockets === 0) {
          this.onlineUsers.delete(userId);
          await this.redisService.del(`user:presence:${userId}`).catch(() => {});
          void this.usersService.touchLastSeen(userId).catch(() => {});
          if (!this.presenceEngine) {
            void this.emitPresenceExceptBlocked(userId, WS_EVENTS.USER_OFFLINE, { userId });
          }
        }
        this.metricsService?.decrementActiveConnections();
        this.logger.log(`Client disconnected: ${client.id}`);
      },
    );
  }

  @SubscribeMessage(WS_EVENTS.GET_ONLINE_STATUS)
  async handleGetOnlineStatus(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(getOnlineStatusSchema)) payload: GetOnlineStatusDto,
    callback?: (res: { status: string; online?: string[]; error?: string }) => void,
  ): Promise<void> {
    try {
      let onlineSubjects: string[] = [];
      if (this.presenceEngine) {
        onlineSubjects = await this.presenceEngine.getOnlineUserIds(payload.userIds);
      } else {
        onlineSubjects = payload.userIds.filter((userId) => this.onlineUsers.has(userId));
      }

      if (onlineSubjects.length === 0) {
        callback?.({ status: 'ok', online: [] });
        return;
      }

      // Resolve each subject's LAST_SEEN visibility toward this viewer (block + privacy + exceptions).
      const ctx = await this.visibility.loadContext(onlineSubjects, client.userId);
      const online = onlineSubjects.filter((userId) =>
        this.visibility.resolve(PrivacyDimension.LAST_SEEN, userId, ctx),
      );
      callback?.({ status: 'ok', online });
    } catch (e) {
      this.logger.warn(`Failed to resolve online status for user ${client.userId}: ${String(e)}`);
      callback?.({ status: 'ok', online: [] });
    }
  }

  @SubscribeMessage(WS_EVENTS.JOIN_CONVERSATION)
  async handleJoin(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(conversationIdSchema)) payload: ConversationIdDto,
  ) {
    await this.convsService.assertMember(payload.conversationId, client.userId);
    await client.join(payload.conversationId);
  }

  @SubscribeMessage(WS_EVENTS.LEAVE_CONVERSATION)
  async handleLeave(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(conversationIdSchema)) payload: ConversationIdDto,
  ) {
    await client.leave(payload.conversationId);
  }

  @SubscribeMessage(WS_EVENTS.TYPING_START)
  async handleTypingStart(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(conversationIdSchema)) payload: ConversationIdDto,
  ) {
    const isTypingLimited = await this.isTypingRateLimited(client.userId).catch(() => false);
    if (isTypingLimited) return;

    const event = typingEventPool.acquire();
    event.conversationId = payload.conversationId;
    event.userId = client.userId;
    event.isTyping = true;

    try {
      await this.emitToConversationExceptBlocked(
        payload.conversationId,
        client.userId,
        WS_EVENTS.TYPING,
        event,
        { includeActor: false, priority: 'ephemeral' },
      );
    } finally {
      typingEventPool.release(event);
    }
  }

  @SubscribeMessage(WS_EVENTS.HEARTBEAT)
  async handleHeartbeat(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
    const userId = client.userId;
    if (!userId) return;
    if (this.presenceEngine) {
      this.presenceEngine.recordHeartbeat(userId);
    } else {
      await this.redisService.set(`user:presence:${userId}`, 'online', 45);
    }
  }

  @SubscribeMessage(WS_EVENTS.TYPING_STOP)
  async handleTypingStop(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(conversationIdSchema)) payload: ConversationIdDto,
  ) {
    const event = typingEventPool.acquire();
    event.conversationId = payload.conversationId;
    event.userId = client.userId;
    event.isTyping = false;

    try {
      await this.emitToConversationExceptBlocked(
        payload.conversationId,
        client.userId,
        WS_EVENTS.TYPING,
        event,
        { includeActor: false, priority: 'ephemeral' },
      );
    } finally {
      typingEventPool.release(event);
    }
  }

  @SubscribeMessage(WS_EVENTS.MARK_READ)
  async handleMarkRead(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(markReadSchema)) payload: MarkReadDto,
  ) {
    const isUpdated = await this.messagesService.markRead(
      payload.conversationId,
      client.userId,
      payload.messageId,
    );

    if (!isUpdated) return;

    const event = readReceiptPool.acquire();
    event.conversationId = payload.conversationId;
    event.userId = client.userId;
    event.messageId = payload.messageId || null;
    event.readAt = new Date().toISOString();

    try {
      await this.emitToConversationExceptBlocked(
        payload.conversationId,
        client.userId,
        WS_EVENTS.MESSAGE_READ,
        event,
        { includeActor: false },
      );
    } finally {
      readReceiptPool.release(event);
    }
  }

  @SubscribeMessage(WS_EVENTS.SEND_MESSAGE)
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(sendMessageSchema)) payload: SendMessageDto,
    callback?: (res: {
      status: string;
      message?: unknown;
      error?: string | undefined;
      clientMessageId?: string | undefined;
      clientSeq?: number | undefined;
    }) => void,
  ): Promise<void> {
    const isLimited = await this.isRateLimited(client.userId).catch(() => false);
    if (isLimited) {
      const rateLimitError = 'Too many messages, slow down';
      client.emit(WS_EVENTS.RATE_LIMIT_EXCEEDED, { message: rateLimitError });
      callback?.({ status: 'error', error: rateLimitError });
      return;
    }

    if (!payload.conversationId) {
      callback?.({ status: 'error', error: 'conversationId is required' });
      return;
    }

    await this.convsService.assertMember(payload.conversationId, client.userId);

    const message = await this.messagesService.send(payload.conversationId, client.userId, payload);

    if (payload.clientSeq != null) {
      await this.redisService
        .set(
          `user:conv:last_client_seq:${client.userId}:${payload.conversationId}`,
          String(payload.clientSeq),
          86400,
        )
        .catch(() => {});
    }

    await this.convsService.touchUpdatedAt(payload.conversationId);
    await this.emitToConversationExceptBlocked(
      payload.conversationId,
      client.userId,
      WS_EVENTS.NEW_MESSAGE,
      {
        conversationId: payload.conversationId,
        message,
        clientMessageId: payload.clientMessageId,
        clientSeq: payload.clientSeq,
      },
    );

    if (this.queueService) {
      void this.queueService
        .addMessageJob(MessageJobType.FANOUT, {
          conversationId: payload.conversationId,
          senderId: client.userId,
          messageId: (message as { id?: string })?.id,
          snippet: payload.text ? payload.text.slice(0, 100) : '',
        })
        .catch(() => {});

      const hashtags = payload.text ? payload.text.match(/#[a-zA-Z0-9_]+/g) : null;
      if (hashtags && hashtags.length > 0) {
        void this.queueService
          .addSearchIndexingJob(SearchJobType.INDEX_HASHTAG, {
            id: (message as { id?: string })?.id || 'msg',
            type: 'hashtag',
            tags: hashtags,
          })
          .catch(() => {});
      }
    }

    callback?.({
      status: 'ok',
      message,
      clientMessageId: payload.clientMessageId,
      clientSeq: payload.clientSeq,
    });
  }

  @SubscribeMessage(WS_EVENTS.GATEWAY_RESUME)
  async handleGatewayResume(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(gatewayResumeSchema)) payload: GatewayResumeDto,
    callback?: (res: {
      status: string;
      events?: any[];
      currentSeq?: number;
      error?: string;
    }) => void,
  ): Promise<void> {
    const userId = client.userId;
    if (!userId) {
      callback?.({ status: 'invalid_session' });
      return;
    }

    try {
      const bufferKey = `user:events:${userId}`;
      const seqRaw = await this.redisService.get(`user:seq:${userId}`).catch(() => '0');
      const currentSeq = Number(seqRaw || '0');

      // If sequence gap exceeds 500 events or requested sequence is ahead
      if (currentSeq > 0 && (currentSeq - payload.lastSeq > 500 || payload.lastSeq > currentSeq)) {
        client.emit(WS_EVENTS.RESYNC_REQUIRED, { currentSeq, reason: 'sequence_gap_too_large' });
        callback?.({ status: 'resync_required', currentSeq });
        return;
      }

      const rawEvents = await this.redisService.zrangebyscore(
        bufferKey,
        `(${payload.lastSeq}`,
        '+inf',
      );

      // If client is behind but buffer is empty (expired), trigger full state resync
      if (currentSeq > payload.lastSeq && rawEvents.length === 0) {
        client.emit(WS_EVENTS.RESYNC_REQUIRED, { currentSeq, reason: 'buffer_expired' });
        callback?.({ status: 'resync_required', currentSeq });
        return;
      }

      const events = rawEvents
        .map((str) => {
          return safeJsonParse<Record<string, unknown>>(str);
        })
        .filter(Boolean);

      client.emit(WS_EVENTS.GATEWAY_RESUMED, { currentSeq, count: events.length });
      callback?.({ status: 'ok', events, currentSeq });
    } catch (err) {
      this.logger.warn(`Gateway resume failed for client ${client.id}: ${String(err)}`);
      client.emit(WS_EVENTS.RESYNC_REQUIRED, { reason: 'resume_error' });
      callback?.({ status: 'resync_required' });
    }
  }

  @SubscribeMessage(WS_EVENTS.MESSAGE_DELIVERED)
  async handleMessageDelivered(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(messageDeliveredSchema)) payload: MessageDeliveredDto,
    callback?: (res: { status: string }) => void,
  ): Promise<void> {
    const userId = client.userId;
    if (!userId) return;

    try {
      await this.convsService.assertMember(payload.conversationId, userId);

      // Broadcast delivery receipt to conversation participants except receiver
      this.server.to(`conversation:${payload.conversationId}`).emit(WS_EVENTS.MESSAGE_DELIVERED, {
        conversationId: payload.conversationId,
        messageId: payload.messageId,
        deliveredToUserId: userId,
        deliveredAt: new Date().toISOString(),
      });

      callback?.({ status: 'ok' });
    } catch (err) {
      this.logger.warn(`handleMessageDelivered error: ${String(err)}`);
      callback?.({ status: 'error' });
    }
  }

  @SubscribeMessage(WS_EVENTS.CLIENT_HIBERNATE)
  async handleClientHibernate(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(clientHibernateSchema)) _payload: ClientHibernateDto,
    callback?: (res: { status: string }) => void,
  ): Promise<void> {
    const userId = client.userId;
    if (userId) {
      // Mark connection as hibernated in background - maintains session without high-frequency heartbeats
      await this.redisService
        .set(`user:hibernated:${userId}:${client.id}`, '1', 300)
        .catch(() => {});
      this.logger.debug?.(`Client ${client.id} (user: ${userId}) hibernated in background.`);
    }
    callback?.({ status: 'ok' });
  }

  @SubscribeMessage(WS_EVENTS.CLIENT_WAKE)
  async handleClientWake(
    @ConnectedSocket() client: AuthenticatedSocket,
    callback?: (res: { status: string; currentSeq?: number }) => void,
  ): Promise<void> {
    const userId = client.userId;
    if (userId) {
      await this.redisService.del(`user:hibernated:${userId}:${client.id}`).catch(() => {});
      await this.redisService.set(`user:presence:${userId}`, 'online', 60).catch(() => {});
      const seqRaw = await this.redisService.get(`user:seq:${userId}`).catch(() => '0');
      const currentSeq = Number(seqRaw || '0');
      callback?.({ status: 'ok', currentSeq });
      return;
    }
    callback?.({ status: 'ok' });
  }

  @SubscribeMessage(WS_EVENTS.EDIT_MESSAGE)
  async handleEditMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(editMessageSchema)) payload: EditMessageDto,
    callback?: (res: { status: string; message?: unknown; error?: string }) => void,
  ): Promise<void> {
    if (!payload.messageId) {
      callback?.({ status: 'error', error: 'messageId is required' });
      return;
    }
    const updatedMessage = await this.messagesService.edit(
      payload.messageId,
      client.userId,
      payload,
    );
    this.emitMessageEdited(updatedMessage.conversationId, updatedMessage);
    callback?.({ status: 'ok', message: updatedMessage });
  }

  @SubscribeMessage(WS_EVENTS.DELETE_MESSAGE)
  async handleDeleteMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(deleteMessageSchema)) payload: DeleteMessageDto,
    callback?: (res: { status: string; deletedForAll: boolean; error?: string }) => void,
  ): Promise<void> {
    if (!payload.messageId) {
      callback?.({ status: 'error', error: 'messageId is required', deletedForAll: false });
      return;
    }
    const msg = await this.messagesService['messagesRepo'].findOne(
      payload.messageId,
      client.userId,
    );

    const result = await this.messagesService.delete(payload.messageId, client.userId, payload);

    if (msg) {
      if (result.deletedForAll) {
        this.emitMessageDeleted(msg.conversationId, result.messageId, true);
      } else {
        this.emitToUser(client.userId, WS_EVENTS.MESSAGE_DELETED, {
          conversationId: msg.conversationId,
          messageId: result.messageId,
          deletedForAll: false,
        });
      }
    }

    callback?.({ status: 'ok', deletedForAll: result.deletedForAll });
  }

  @SubscribeMessage(WS_EVENTS.FORWARD_MESSAGE)
  async handleForwardMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(forwardMessageSchema)) payload: ForwardMessageDto,
    callback?: (res: { status: string; messages?: unknown[]; error?: string }) => void,
  ): Promise<void> {
    if (!payload.messageId) {
      callback?.({ status: 'error', error: 'messageId is required' });
      return;
    }
    const results = await this.messagesService.forward(payload.messageId, client.userId, payload);

    for (const msg of results) {
      await this.emitToConversationExceptBlocked(
        msg.conversationId,
        client.userId,
        WS_EVENTS.NEW_MESSAGE,
        { conversationId: msg.conversationId, message: msg },
      );
    }

    callback?.({ status: 'ok', messages: results });
  }

  @SubscribeMessage(WS_EVENTS.ADD_REACTION)
  async handleAddReaction(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(reactToMessageSchema)) payload: ReactToMessageDto,
    callback?: (res: { status: string; message?: unknown; error?: string }) => void,
  ): Promise<void> {
    if (!payload.messageId) {
      callback?.({ status: 'error', error: 'messageId is required' });
      return;
    }
    try {
      const updated = await this.messagesService.addReaction(
        payload.messageId,
        client.userId,
        payload,
      );
      this.emitReactionAdded(updated.conversationId, updated);
      callback?.({ status: 'ok', message: updated });
    } catch (err: unknown) {
      callback?.({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to add reaction',
      });
    }
  }

  @SubscribeMessage(WS_EVENTS.REMOVE_REACTION)
  async handleRemoveReaction(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(reactToMessageSchema)) payload: ReactToMessageDto,
    callback?: (res: { status: string; message?: unknown; error?: string }) => void,
  ): Promise<void> {
    if (!payload.messageId) {
      callback?.({ status: 'error', error: 'messageId is required' });
      return;
    }
    try {
      const updated = await this.messagesService.removeReaction(
        payload.messageId,
        client.userId,
        payload.emoji,
      );
      this.emitReactionRemoved(updated.conversationId, updated);
      callback?.({ status: 'ok', message: updated });
    } catch (err: unknown) {
      callback?.({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to remove reaction',
      });
    }
  }

  @SubscribeMessage(WS_EVENTS.PIN_MESSAGE)
  async handlePinMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(togglePinMessageSchema)) payload: TogglePinMessageDto,
    callback?: (res: { status: string; error?: string }) => void,
  ): Promise<void> {
    try {
      await this.messagesService.pinMessage(
        payload.conversationId,
        payload.messageId,
        client.userId,
      );
      this.emitMessagePinned(payload.conversationId, payload.messageId);
      callback?.({ status: 'ok' });
    } catch (err: unknown) {
      callback?.({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to pin message',
      });
    }
  }

  @SubscribeMessage(WS_EVENTS.UNPIN_MESSAGE)
  async handleUnpinMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ZodValidationPipe(togglePinMessageSchema)) payload: TogglePinMessageDto,
    callback?: (res: { status: string; error?: string }) => void,
  ): Promise<void> {
    try {
      await this.messagesService.unpinMessage(
        payload.conversationId,
        payload.messageId,
        client.userId,
      );
      this.emitMessageUnpinned(payload.conversationId, payload.messageId);
      callback?.({ status: 'ok' });
    } catch (err: unknown) {
      callback?.({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to unpin message',
      });
    }
  }

  private async emitToConversationExceptBlocked(
    conversationId: string,
    actingUserId: string,
    event: string,
    payload: unknown,
    opts: { includeActor?: boolean; priority?: EventPriority } = {},
  ): Promise<void> {
    const includeActor = opts.includeActor ?? true;
    const priority = opts.priority ?? 'critical';

    const [participantIds, { blockedByMe, blockingMe }] = await Promise.all([
      this.convsService.getParticipantIds(conversationId),
      this.convsService.getBlockRelationships(actingUserId),
    ]);

    for (const userId of participantIds) {
      if (userId === actingUserId) {
        if (includeActor) this.emitToUser(userId, event, payload, priority);
        continue;
      }
      if (blockedByMe.has(userId) || blockingMe.has(userId)) continue;
      this.emitToUser(userId, event, payload, priority);
    }
  }

  private async emitPresenceExceptBlocked(
    subjectUserId: string,
    event: string,
    payload: unknown,
  ): Promise<void> {
    const candidates = [...this.onlineUsers.keys()].filter((id) => id !== subjectUserId);
    if (candidates.length === 0) return;

    const audience = await this.visibility.resolvePresenceAudience(subjectUserId, candidates);

    for (const [userId, socketIds] of this.onlineUsers.entries()) {
      if (userId !== subjectUserId && !audience.has(userId)) continue;
      for (const socketId of socketIds) {
        const socket = this.server?.sockets?.sockets?.get(socketId);
        if (socket) {
          if (this.backpressureService) {
            this.backpressureService.sendSafe(socket, event, payload, 'ephemeral');
          } else {
            socket.emit(event, payload);
          }
        }
      }
    }
  }

  emitToUser(
    userId: string,
    event: string,
    payload: unknown,
    priority: EventPriority = 'critical',
  ): void {
    void (async () => {
      try {
        const seq = (await this.redisService.incr(`user:seq:${userId}`)) | 0;
        await this.redisService.expire(`user:seq:${userId}`, 86400 * 30).catch(() => {});

        // Shape-stable wrapper — always same key order {seq, event, payload, timestamp}
        // V8 assigns one stable hidden-class for all emitToUser calls
        const wrapped = makeWsEvent(seq, event, payload, Date.now());
        const serialized = buildWsFrameString(wrapped);
        // Pool release no longer needed (makeWsEvent is allocation-per-call but
        // remains monomorphic — GC collects this, no fragmentation from mixed shapes)
        // For zero-allocation budget: the pool is still used for typing/read-receipts
        // which are the true high-frequency paths (100+ calls/sec)

        const bufferKey = `user:events:${userId}`;
        await this.redisService.zadd(bufferKey, seq, serialized);
        await this.redisService.zremrangebyrank(bufferKey, 0, -500);
        await this.redisService.expire(bufferKey, 600);
      } catch (e) {
        this.logger.warn(`Redis event buffer error for user ${userId}: ${String(e)}`);
      }
    })();

    // Broadcast across all cluster instances to the user room
    this.server.to(`user:${userId}`).emit(event, payload);

    const socketIds = this.onlineUsers.get(userId);
    if (!socketIds) return;
    for (const socketId of socketIds) {
      const socket = this.server?.sockets?.sockets?.get(socketId);
      if (socket && this.backpressureService) {
        this.backpressureService.sendSafe(socket, event, payload, priority);
      }
    }
  }

  emitMessageEdited(conversationId: string, message: unknown) {
    this.server.to(conversationId).emit(WS_EVENTS.MESSAGE_EDITED, { conversationId, message });
  }

  emitMessageDeleted(conversationId: string, messageId: string, deletedForAll: boolean) {
    this.server
      .to(conversationId)
      .emit(WS_EVENTS.MESSAGE_DELETED, { conversationId, messageId, deletedForAll });
  }

  emitReactionAdded(conversationId: string, message: unknown) {
    this.server
      .to(conversationId)
      .emit(WS_EVENTS.MESSAGE_REACTION_ADDED, { conversationId, message });
  }

  emitReactionRemoved(conversationId: string, message: unknown) {
    this.server
      .to(conversationId)
      .emit(WS_EVENTS.MESSAGE_REACTION_REMOVED, { conversationId, message });
  }

  emitMessagePinned(conversationId: string, messageId: string) {
    this.server.to(conversationId).emit(WS_EVENTS.MESSAGE_PINNED, { conversationId, messageId });
  }

  emitMessageUnpinned(conversationId: string, messageId: string) {
    this.server.to(conversationId).emit(WS_EVENTS.MESSAGE_UNPINNED, { conversationId, messageId });
  }

  emitConversationDeleted(conversationId: string, participantUserIds: string[] = []) {
    this.server.to(conversationId).emit(WS_EVENTS.CONVERSATION_DELETED, { conversationId });
    if (participantUserIds.length > 100 && this.queueService) {
      void this.queueService.addGlobalEntityFanoutJob(
        conversationId,
        WS_EVENTS.CONVERSATION_DELETED,
        { conversationId },
      );
    } else {
      for (const userId of participantUserIds) {
        this.emitToUser(userId, WS_EVENTS.CONVERSATION_DELETED, { conversationId });
      }
    }
  }

  emitMessagesCleared(conversationId: string, participantUserIds: string[] = []) {
    this.server.to(conversationId).emit(WS_EVENTS.MESSAGES_CLEARED, { conversationId });
    if (participantUserIds.length > 100 && this.queueService) {
      void this.queueService.addGlobalEntityFanoutJob(conversationId, WS_EVENTS.MESSAGES_CLEARED, {
        conversationId,
      });
    } else {
      for (const userId of participantUserIds) {
        this.emitToUser(userId, WS_EVENTS.MESSAGES_CLEARED, { conversationId });
      }
    }
  }

  private async isRateLimited(userId: string): Promise<boolean> {
    const now = Date.now();
    const key = `rate_limit:messages:${userId}`;
    const clearBefore = now - this.RATE_WINDOW_MS;
    const member = `${now}:${Math.random()}`;

    const results = await this.redisService
      .getClient()
      .multi()
      .zremrangebyscore(key, 0, clearBefore)
      .zadd(key, now, member)
      .zcard(key)
      .pexpire(key, this.RATE_WINDOW_MS)
      .exec();

    if (!results) return false;
    const zcardRow = results[2];
    const totalRequestsInWindow = zcardRow && zcardRow[1] ? (zcardRow[1] as number) : 0;
    return totalRequestsInWindow > this.RATE_LIMIT;
  }

  private async isTypingRateLimited(userId: string): Promise<boolean> {
    const key = `rate_limit:typing:${userId}`;
    const exists = await this.redisService.exists(key);
    if (exists) return true;
    await this.redisService.set(key, '1', 4);
    return false;
  }

  @SubscribeMessage('subscribeShowcase')
  handleSubscribeShowcase(
    @ConnectedSocket() client: Socket,
    @MessageBody(
      new ZodValidationPipe(
        z.object({
          targetUserId: z.string().min(1).max(128),
        }),
      ),
    )
    data: { targetUserId: string },
  ) {
    if (data?.targetUserId) {
      void client.join(`showcase:${data.targetUserId}`);
    }
  }

  @SubscribeMessage('unsubscribeShowcase')
  handleUnsubscribeShowcase(
    @ConnectedSocket() client: Socket,
    @MessageBody(
      new ZodValidationPipe(
        z.object({
          targetUserId: z.string().min(1).max(128),
        }),
      ),
    )
    data: { targetUserId: string },
  ) {
    if (data?.targetUserId) {
      void client.leave(`showcase:${data.targetUserId}`);
    }
  }

  @OnEvent('showcase.presence.updated')
  handleShowcasePresenceUpdated(payload: { userId: string; activityStatus: unknown }) {
    if (payload?.userId) {
      this.server.to(`showcase:${payload.userId}`).emit('showcase:presence:update', payload);
    }
  }

  @SubscribeMessage('subscribeStory')
  handleSubscribeStory(
    @ConnectedSocket() client: Socket,
    @MessageBody(
      new ZodValidationPipe(
        z.object({
          storyId: z.string().min(1).max(128),
        }),
      ),
    )
    data: { storyId: string },
  ) {
    if (data?.storyId) {
      void client.join(`story:${data.storyId}`);
    }
  }

  @SubscribeMessage('unsubscribeStory')
  handleUnsubscribeStory(
    @ConnectedSocket() client: Socket,
    @MessageBody(
      new ZodValidationPipe(
        z.object({
          storyId: z.string().min(1).max(128),
        }),
      ),
    )
    data: { storyId: string },
  ) {
    if (data?.storyId) {
      void client.leave(`story:${data.storyId}`);
    }
  }

  @OnEvent('story.created')
  handleStoryCreated(payload: { authorId: string; story: any }) {
    if (payload?.authorId) {
      // Broadcast new story event so follower clients instantly light up glowing StoryAvatar rings
      this.server.emit('story:new', payload);
    }
  }

  @OnEvent('story.viewed')
  handleStoryViewed(payload: {
    storyId: string;
    authorId: string;
    viewerId: string;
    viewer: any;
    viewedAt: string;
  }) {
    if (payload?.storyId) {
      // Broadcast to room of active viewers/author for this story
      this.server.to(`story:${payload.storyId}`).emit('story:viewed', payload);
    }
  }

  @OnEvent('story.reacted')
  handleStoryReacted(payload: {
    storyId: string;
    authorId: string;
    userId: string;
    user: any;
    emoji: string;
    createdAt: string;
  }) {
    if (payload?.storyId) {
      this.server.to(`story:${payload.storyId}`).emit('story:reacted', payload);
    }
  }

  @OnEvent('story.poll_voted')
  handleStoryPollVoted(payload: {
    storyId: string;
    authorId: string;
    userId: string;
    pollResult: any;
    optionIndex: number;
  }) {
    if (payload?.storyId) {
      this.server.to(`story:${payload.storyId}`).emit('story:poll_voted', payload);
    }
  }

  @SubscribeMessage('e2ee:key_exchange')
  handleE2eeKeyExchange(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    payload: {
      recipientId: string;
      ephemeralPublicKey: string;
      conversationId?: string;
    },
    callback?: (res: { status: string }) => void,
  ): void {
    const senderId = client.userId;
    if (!senderId || !payload?.recipientId || !payload?.ephemeralPublicKey) {
      callback?.({ status: 'error' });
      return;
    }

    this.server.to(`user:${payload.recipientId}`).emit('e2ee:key_exchange_received', {
      senderId,
      ephemeralPublicKey: payload.ephemeralPublicKey,
      conversationId: payload.conversationId,
      timestamp: new Date().toISOString(),
    });

    callback?.({ status: 'ok' });
  }

  private extractToken(client: Socket): string | null {
    const authHeader = client.handshake.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);
    return (client.handshake.auth?.token as string) ?? null;
  }
}
