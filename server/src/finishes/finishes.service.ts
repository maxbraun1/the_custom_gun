import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinishesService {
  constructor(private prisma: PrismaService) {}

  async getFinishes() {
    let finishes = await this.prisma.finishes.findMany().catch((err) => {
      console.log(err);
      throw new InternalServerErrorException();
    });
    return finishes;
  }
}
