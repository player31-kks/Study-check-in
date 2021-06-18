import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async getUsers() {
    const users = await this.userRepository.find()
    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async createUser(userInfo: CreateUserDto) {
    const newUser = await this.userRepository.save({ ...userInfo, status: false });
    return newUser;
  }
}
