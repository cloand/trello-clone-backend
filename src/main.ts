import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  app.use(cors());
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
