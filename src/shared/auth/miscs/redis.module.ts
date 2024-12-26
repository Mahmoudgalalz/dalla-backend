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
          host: 'localhost',
          port: 6379,
        });
        return redis;
      },
    },
  ],
  exports: [Constants.REDIS_CLIENT],
})
export class RedisModule {}
