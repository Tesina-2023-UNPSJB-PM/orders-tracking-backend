import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './domain/user.entity';
import { dbUsers } from './dbUsers.const';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.users = dbUsers;
  }

  create(createUserDto: CreateUserDto) {
    const newId = this.users.length + 1;
    const newUser = CreateUserDto.mapToUser(createUserDto);
    newUser.userId = newId;
    this.users.push(newUser);

    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.userId === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
