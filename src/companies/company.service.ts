import { Injectable } from '@nestjs/common';
import { PostgresPrismaService } from '@/config/prisma/postgres.services';
import { Prisma } from '@/prisma/postgres';
import { newId } from '@/shared/utils/unique-id';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PostgresPrismaService) {}

  async onboarding(
    companyId: string,
    onboadingData: Omit<Prisma.CompanyProfileCreateWithoutCompanyInput, 'id'>,
  ) {
    const id = newId('companyProfile');
    await this.prisma.companyProfile.create({
      data: {
        id,
        companyId,
        ...onboadingData,
      },
    });
    return await this.prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        onboarded: true,
      },
      include: {
        CompanyProfile: true,
      },
    });
  }
}
