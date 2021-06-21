import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { resolve } from 'path';
import * as bodyParser from 'body-parser';

// import { ViewController } from '../views/view.controller';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.set("port", process.env.PORT || 3000);
  // app.set("views", path.join(__dirname, "../views"));
  // app.set("view engine", "ejs");
  // // app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine("hbs");
  await app.listen(3000);

  // app.get('/', ViewController.index)
}
bootstrap();
