import { PostgresPrismaService } from '@/config/prisma/postgres.services';
import { PlatformAuthModule } from '@/shared/auth/platform/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PlatformAuthModule],
  providers: [PostgresPrismaService],
})
export class ProfessionalModule {}
