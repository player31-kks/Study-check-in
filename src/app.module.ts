import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TimeModule } from './time/time.module';
import { AuthModule } from './auth/auth.module';
// import { ViewController } from '../views/view.controller';
@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, TimeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {

  }
}
// export class AppModule { }
