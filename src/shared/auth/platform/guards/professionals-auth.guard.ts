import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { PostgresPrismaService } from '@/config/prisma/postgres.services';
import { PinoLogger } from 'nestjs-pino';
import { IS_PUBLIC_KEY } from '@/shared/decorators/isPublic.decorator';

@Injectable()
export class ProfessionalAuthGuard implements CanActivate {
  private readonly logger = new PinoLogger({
    renameContext: ProfessionalAuthGuard.name,
  });

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private prisma: PostgresPrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    // const refreshToken = request.cookies['refreshToken'];

    // if (!token && !refreshToken) {
    //   throw new UnauthorizedException('No token provided');
    // }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });
      if (user) {
        request['user'] = user;
        return true;
      }
    } catch (error) {
      this.logger.error(`Failed to authenticate: ${error.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return undefined;
    }
    return authHeader.split(' ')[1];
  }

  private async useRefreshToken(request: Request) {
    const oldRefreshToken = request.cookies['refreshToken'];
    const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
      secret: process.env.JWT_SECRET,
    });
    return payload;
  }
}
