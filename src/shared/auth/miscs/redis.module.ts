import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { Constants } from '@/shared/constants';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const redis = new Redis({
          port: parseInt(process.env.REDIS_PORT) || 6379,
          host: process.env.REDIS_HOST || 'localhost',
          password: process.env.REDIS_PASSWORD || undefined,
          username: process.env.REDIS_USERNAME || undefined,
        });
        return redis;
      },
    },
  ],
  exports: [Constants.REDIS_CLIENT],
})
export class RedisModule {}
