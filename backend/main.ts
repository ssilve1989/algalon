import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './app-config.interface';

async function bootstrap() {
  const logger = new Logger();
  // TODO: Fastify logger?
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const config = app.get<ConfigService<AppConfig>>(ConfigService);

  // Setup super cool auto API documentation + playground
  const options = new DocumentBuilder().setTitle('Algalon').build();

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get('HTTP_PORT')!); // stupid types require !

  const url = await app.getUrl();

  logger.log(`http server listenting at ${url}`);
  logger.log('Algalon Back End is Online');
}

bootstrap();
