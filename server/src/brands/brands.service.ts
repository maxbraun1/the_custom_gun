import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async getBrands() {
    let brands = await this.prisma.brands.findMany().catch((err) => {
      console.log(err);
      throw new InternalServerErrorException();
    });
    return brands;
  }
}
