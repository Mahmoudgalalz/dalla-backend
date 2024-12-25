import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Logger as pinoLogger } from 'nestjs-pino';
import { AllExceptionFilter } from './shared/filters/all-exception.filter';
import { AllSuccessResponseFilter } from './shared/filters/all-success.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const origins = process.env.ORIGINS
    ? process.env.origins.replace(' ', '').split(',')
    : [];
  const port = process.env.PORT ?? 3000;
  const corsOption = {
    origin: origins,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    // credentials: true,
  };

  app.useLogger(app.get(pinoLogger));
  app.use(cookieParser());
  app.enableCors(corsOption);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new AllSuccessResponseFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port, () => Logger.log(`Dalla backend is up on: ${port}.`));
}
bootstrap();
