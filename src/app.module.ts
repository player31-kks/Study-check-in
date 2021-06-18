import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TimeModule } from './time/time.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, TimeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
