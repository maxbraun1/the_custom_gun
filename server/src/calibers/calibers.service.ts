import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CalibersService {
  constructor(private prisma: PrismaService) {}

  async getCalibers() {
    let calibers = await this.prisma.calibers.findMany().catch((err) => {
      console.log(err);
      throw new InternalServerErrorException();
    });
    return calibers;
  }
}
