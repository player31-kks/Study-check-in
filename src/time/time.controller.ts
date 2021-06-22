import { Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private timeService: TimeService) { }

  @Post('/checkin/:name')
  @UseGuards(new AuthGuard())
  async checkIn(@Param('name') name: string, @Headers() headers) {
    return this.timeService.checkIn(headers, name)
  }

  @Post('/checkout/:name')
  @UseGuards(new AuthGuard())
  async checkOut(@Param('name') name: string, @Headers() headers) {
    return this.timeService.checkOut(headers, name)
  }

  @Get('/')
  async getTotalTime() {
    return this.timeService.getTotalTime()
  }
}
