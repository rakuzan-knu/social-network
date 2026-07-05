import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUsersRepository } from './users-repository.interface';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(@Inject('IUsersRepository') private readonly usersRepository: IUsersRepository) {}

  async getUser(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException('User id is required');
    }
    const user = await this.usersRepository.getUser(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    if (!id) {
      throw new BadRequestException('User id is required');
    }
    const user = await this.usersRepository.getUser(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.usersRepository.updateUser(id, data);
  }
}
