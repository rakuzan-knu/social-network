import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Module({
  providers: [
    UsersRepository,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
