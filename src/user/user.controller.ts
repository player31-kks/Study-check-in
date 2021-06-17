import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post('/')
  async createUser(@Body() userInfo: CreateUserDto) {
    return this.userService.createUser(userInfo);
  }
}
