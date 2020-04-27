import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'hari',
        password: 'hari123',
      },
      {
        userId: 2,
        username: 'test',
        password: 'test123',
      },
    ];
  }

  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
