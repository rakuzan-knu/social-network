import { Module } from '@nestjs/common';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { FollowersRepository } from './followers.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FollowersController],
  providers: [
    FollowersRepository,
    {
      provide: 'IFollowersRepository',
      useClass: FollowersRepository,
    },
    FollowersService,
  ],
  exports: [FollowersService],
})
export class FollowersModule {}
