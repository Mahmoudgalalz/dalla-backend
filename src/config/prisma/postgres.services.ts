import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@/prisma/postgres';

@Injectable()
export class PostgresPrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({
      log: ['query', 'info'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
