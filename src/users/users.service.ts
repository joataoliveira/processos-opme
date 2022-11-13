import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { convert } from 'typeorm-schema-to-json-schema';

// This should be a real class/interface representing a user entity
//export type User = any;

@Injectable()
export class UsersService {

  constructor(@InjectRepository(Users) private repository:Repository<Users>){}
  /*private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    }
  ];*/

  async findOne(userId: string) {

    const returnUser = await this.repository
    .createQueryBuilder("users")
    .where("users.username = :userId",{userId:userId})
    .getOne();

    return returnUser;
  }
}