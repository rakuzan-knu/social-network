import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IFollowersRepository } from '../interfaces/followers-repository.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { UserProfileDto } from '../../users/dto/user-profile.dto';

const userProfileSelect = {
  id: true,
  email: true,
  username: true,
  displayName: true,
  avatar: true,
  bio: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class FollowersRepository implements IFollowersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getFollowers(userId: string): Promise<UserProfileDto[]> {
    const follows = await this.prismaService.follow.findMany({
      where: { followingId: userId },
      include: { follower: { select: userProfileSelect } },
    });
    return follows.map((f) => f.follower);
  }

  async getFollowing(userId: string): Promise<UserProfileDto[]> {
    const follows = await this.prismaService.follow.findMany({
      where: { followerId: userId },
      include: { following: { select: userProfileSelect } },
    });
    return follows.map((f) => f.following);
  }

  async followUser(followerId: string, followingId: string): Promise<void> {
    await this.prismaService.follow.create({
      data: { followerId, followingId },
    });
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    await this.prismaService.follow.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
  }
}
