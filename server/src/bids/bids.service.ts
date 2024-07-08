import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBidDTO } from './dto/get-bid.dto';

@Injectable()
export class BidsService {
  constructor(private prisma: PrismaService) {}

  async create(user_id: string, listing_id: string, amount: number) {
    const listing = await this.prisma.listings.findFirst({
      where: { id: listing_id },
    });

    if (amount < Number(listing.current_bid) + 5) {
      return {
        error: true,
        message: 'Bid must be at least $5 above current bid.',
      };
    }

    await this.prisma.bids
      .create({
        data: {
          listing_id,
          user_id,
          amount,
        },
      })
      .then(async (bid) => {
        let reserve_met = false;

        if (bid.amount.toNumber() >= listing.reserve_price.toNumber())
          reserve_met = true;

        await this.prisma.listings.update({
          where: { id: listing_id },
          data: {
            current_bid: amount,
            bid_count: { increment: 1 },
            reserve_met,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async getBids(user_id: string, per: number, page: number) {
    if (!page) page = 1;
    if (!per) per = 10;
    const skip = (page - 1) * per;

    let bids = await this.prisma.bids.findMany({
      where: { user_id, listing: { status: 'active' } },
      include: {
        listing: {
          select: {
            ref: true,
            title: true,
            thumbnail: { select: { url: true } },
            current_bid: true,
            end_date: true,
          },
        },
      },
      take: per,
      skip,
    });

    const count = await this.prisma.bids
      .count({
        where: { user_id, listing: { status: 'active' } },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    const formattedBids = bids.map((bid) => new GetBidDTO(bid));
    return { count, bids: formattedBids };
  }
}
