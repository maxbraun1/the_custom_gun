import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActiveAccountGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      const user = await this.prisma.users.findFirst({
        where: { id: request.user.id },
      });

      if (user.account_status === 'active') {
        return true;
      }
    }

    return false;
  }
}
