import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PlatformAuthService } from './auth.service';
import { Response } from 'express';
import { Public } from '@/shared/decorators/isPublic.decorator';
import { LoginDto } from './dto/login.dto';
import { CompanyRegisterDto } from './dto/register-company.dto';
import { VerifyDto } from './dto/verify.dto';
@Controller('auth')
export class PlatformAuthController {
  constructor(private readonly authService: PlatformAuthService) {}

  @Public()
  @Post('company/login')
  @HttpCode(HttpStatus.OK)
  async companyLogin(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const payload = await this.authService.validateCompany(
        loginDto.email,
        loginDto.password,
      );
      if (payload.access_token) {
        res.cookie('refreshToken', payload.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          domain:
            process.env.NODE_ENV !== 'development'
              ? process.env.domain
              : 'localhost',
        });
        res.status(HttpStatus.ACCEPTED).send({
          success: true,
          message: 'Tokens',
          data: {
            access_token: payload.access_token,
          },
        });
        return;
      }
      res.status(HttpStatus.NOT_FOUND).send({
        status: 'error',
        message: "Couldn't find the user",
        data: {},
      });
      return;
    } catch (err) {
      throw new UnauthorizedException(err?.message, {
        cause: err,
        description: err,
      });
    }
  }

  @Post('company/register')
  @Public()
  async companyRegister(
    @Res() res: Response,
    @Body() registerDto: CompanyRegisterDto,
  ) {
    try {
      const result = await this.authService.companyRegister(registerDto);
      res.status(HttpStatus.ACCEPTED).send(result);
    } catch (err) {
      throw new UnauthorizedException(err?.message, {
        cause: err,
        description: err,
      });
    }
  }

  @Post('company/verify')
  @Public()
  async companyRegisterVerify(
    @Res() res: Response,
    @Body() verifyOtp: VerifyDto,
  ) {
    try {
      const result = await this.authService.companyVerify(
        verifyOtp.email,
        verifyOtp.otp,
      );
      return {
        succuess: true,
        message: "Company's email verified",
        data: result,
      };
    } catch (err) {
      throw new UnauthorizedException(err?.message, {
        cause: err,
        description: err,
      });
    }
  }
}
