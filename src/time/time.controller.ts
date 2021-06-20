import { Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private timeService: TimeService) { }

  @Post('/checkin')
  @UseGuards(new AuthGuard())
  async checkIn(@Headers() headers) {
    return this.timeService.checkIn(headers)
  }

  @Post('/checkout')
  @UseGuards(new AuthGuard())
  async checkOut(@Headers() headers) {
    return this.timeService.checkOut(headers)
  }
}
