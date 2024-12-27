import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyAuthGuard } from '@/shared/auth/platform/guards/company-auth.guard';
import { CurrentCompany } from '@/shared/decorators/current-auth.decorator';
import { OnboardingValidation } from './validation/onboarding.validation';
import { Company } from '@/prisma/postgres';

@Controller()
@UseGuards(CompanyAuthGuard)
export class PlatformAuthController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('onboarding')
  @HttpCode(HttpStatus.OK)
  async companyLogin(
    @CurrentCompany() company: Company,
    @Body() onboardingValidation: OnboardingValidation,
  ) {
    try {
      const onboarding = await this.companyService.onboarding(
        company.id,
        onboardingValidation,
      );
      return {
        success: true,
        message: 'Company onboarding',
        data: onboarding,
      };
    } catch (err) {
      throw new UnauthorizedException(err?.message, {
        cause: err,
        description: err,
      });
    }
  }
}
