import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { map } from 'rxjs/operators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post('/register')
  async createUser(@Body() userInfo: UserDto) {
    return this.userService.createUser(userInfo);
  }

  @Post('/login')
  async login(@Body() userInfo: UserDto) {
    return (await this.userService.login(userInfo)).pipe(
      map((jwt: string) => {
        return { token: jwt }
      })
    )
  }
}
