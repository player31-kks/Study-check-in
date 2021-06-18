import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database/database.module';
import { TimeModule } from './time/time.module';
@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, TimeModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
