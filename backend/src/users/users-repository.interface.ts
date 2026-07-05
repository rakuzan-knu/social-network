import { type Prisma, type User } from '@prisma/client';

export interface IUsersRepository {
  getUser(id: string): Promise<User | null>;
  updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
}
