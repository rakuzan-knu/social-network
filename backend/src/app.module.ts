import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { HealthModule } from './health/health.module';
import { LikesModule } from './likes/likes.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './users/users.module';
import { FollowersModule } from './followers/followers.module';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    PostsModule,
    LikesModule,
    CommentsModule,
    RedisModule,
    UsersModule,
    FollowersModule,
    AvatarsModule,
  ],
})
export class AppModule {}
