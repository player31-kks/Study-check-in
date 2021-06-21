import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() { }

  @Get("/register")
  @Render('register')
  register() { }

  @Get("/login")
  @Render('login')
  login() { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  // @Get(/login)
  // @Render('login')
  // root() { }
}
