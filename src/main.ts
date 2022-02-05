import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filtrer/http-exception.filter';

const adapter =
  process.env.USE_FASTIFY === 'fastify'
    ? new FastifyAdapter()
    : new ExpressAdapter();

async function bootstrap() {
  try {
    const app = await NestFactory.create<
      NestFastifyApplication | NestExpressApplication
    >(AppModule, adapter);
    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(+process.env.PORT || 4000);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
