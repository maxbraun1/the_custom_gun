import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ListingEntity } from 'src/listings/listing.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: string, listing_id: string) {
    if (!(await this.checkIsWatched(user_id, listing_id))) {
      await this.prisma.watches
        .create({
          data: { user_id, listing_id },
        })
        .catch((err) => {
          console.log(err);
          throw new InternalServerErrorException();
        });
    }
  }

  async getWatches(user_id: string, per: number, page: number) {
    if (!page) page = 1;
    if (!per) per = 10;
    const skip = (page - 1) * per;

    let watches = await this.prisma.watches.findMany({
      where: { user_id, listing: { status: 'active' } },
      include: {
        listing: {
          select: {
            ref: true,
            title: true,
            listing_type: true,
            price: true,
            thumbnail: { select: { url: true } },
            current_bid: true,
            end_date: true,
          },
        },
      },
      take: per,
      skip,
    });

    const count = await this.prisma.watches
      .count({
        where: { user_id, listing: { status: 'active' } },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    const formattedWatches = watches.map(
      (watch) => new ListingEntity(watch.listing),
    );
    return { count, watches: formattedWatches };
  }

  async delete(user_id: string, listing_id: string) {
    await this.prisma.watches
      .deleteMany({
        where: { user_id, listing_id },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async checkIsWatched(user_id: string, listing_id: string) {
    return await this.prisma.watches
      .findFirst({
        where: { user_id, listing_id },
      })
      .then((result) => {
        if (result) return true;
        return false;
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }
}
