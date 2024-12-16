import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import { createRootUser, creatRootTokenPrice } from './common/init.data';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Logger as pinoLogger } from 'nestjs-pino';

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

  // await createRootUser('root', process.env.ADMIN, process.env.PASSWORD);
  // await creatRootTokenPrice(Number(process.env.TOKEN_PRICE));

  app.useLogger(app.get(pinoLogger));
  app.use(cookieParser());
  app.enableCors(corsOption);
  // app.useGlobalFilters(new ErrorResponse());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port, () => Logger.log(`Dalla backend is up on: ${port}.`));
}
bootstrap();
