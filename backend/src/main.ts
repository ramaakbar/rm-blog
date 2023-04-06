import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://blog.ramaakbar.xyz/'],
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const config = new DocumentBuilder()
    .setTitle('rm-blog Rest API')
    .setDescription('all available api endpoint for rm-blog')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
