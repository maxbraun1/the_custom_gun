import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FFLEntity } from './entities/ffl.entity';

@Injectable()
export class FflsService {
  constructor(private readonly prisma: PrismaService) {}

  async searchFFLs(term: string) {
    term = term.trim().split(' ').join(' & ');
    const ffls = await this.prisma.ffls
      .findMany({
        where: {
          OR: [
            { PREMISE_ZIP_CODE: { search: term } },
            { PREMISE_CITY: { search: term } },
            { BUSINESS_NAME: { search: term } },
            { LICENSE_NAME: { search: term } },
          ],
        },
        take: 30,
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    return ffls.map((ffl) => new FFLEntity(ffl));
  }

  async getFFL(id: string) {
    const ffl = await this.prisma.ffls
      .findFirst({
        where: { id },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    return new FFLEntity(ffl);
  }
}
