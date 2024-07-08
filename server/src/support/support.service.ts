import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private readonly prisma: PrismaService) {}

  async createSupport(
    email: string,
    subject: string,
    message: string,
    type: string,
  ) {
    await this.prisma.support
      .create({
        data: { email, subject, message, type },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    return true;
  }
}
