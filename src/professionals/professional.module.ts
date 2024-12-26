import { PostgresPrismaService } from '@/config/prisma/postgres.services';
import { PlatformAuthModule } from '@/shared/auth/platform/auth.module';
import { ProfessionalAuthGuard } from '@/shared/auth/platform/guards/professionals-auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PlatformAuthModule],
  providers: [
    PostgresPrismaService,
    {
      provide: APP_GUARD,
      useClass: ProfessionalAuthGuard,
    },
  ],
})
export class ProfessionalModule {}
