import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { User } from '@prisma/client';

const HARDCODED_CURRENT_USER_ID = 'REPLACE_WITH_REAL_USER_ID';

@Controller('users')
export class FollowersController {
  constructor(private readonly followerService: FollowersService) {}

  @Get(':id/followers')
  getFollowers(@Param('id') id: string): Promise<User[]> {
    return this.followerService.getFollowers(id);
  }

  @Get(':id/following')
  getFollowing(@Param('id') id: string): Promise<User[]> {
    return this.followerService.getFollowing(id);
  }

  @Post(':id/follow')
  followUser(@Param('id') followingId: string): Promise<void> {
    const followerId = HARDCODED_CURRENT_USER_ID;
    return this.followerService.followUser(followerId, followingId);
  }

  @Delete(':id/follow')
  unfollowUser(@Param('id') followingId: string): Promise<void> {
    const followerId = HARDCODED_CURRENT_USER_ID;
    return this.followerService.unfollowUser(followerId, followingId);
  }
}
