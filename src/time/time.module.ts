import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';
import { Hours } from './hours.entity';
import { TimeController } from './time.controller';
import { Time } from './time.entity';
import { TimeService } from './time.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Time, User, Hours]),
    AuthModule
  ],
  controllers: [TimeController],
  providers: [TimeService]
})
export class TimeModule { }
