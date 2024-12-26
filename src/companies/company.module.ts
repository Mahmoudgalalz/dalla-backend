import { PostgresPrismaService } from '@/config/prisma/postgres.services';
import { PlatformAuthModule } from '@/shared/auth/platform/auth.module';
import { CompanyAuthGuard } from '@/shared/auth/platform/guards/company-auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PlatformAuthModule],
  providers: [
    PostgresPrismaService,
    {
      provide: APP_GUARD,
      useClass: CompanyAuthGuard,
    },
  ],
})
export class CompanyModule {}
