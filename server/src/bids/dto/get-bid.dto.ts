import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';

export class GetBidDTO {
  id: string;
  date: Date;

  @Transform(({ value }) => {
    return { ...value, current_bid: value.current_bid.toNumber() };
  })
  listing: {
    ref: string;
    title: string;
    thumbnail: { url: string };
    current_bid: Decimal;
  };
  @Transform(({ value }) => Number(value))
  amount: Decimal;
  end_date: Date;

  constructor(partial: Partial<GetBidDTO>) {
    Object.assign(this, partial);
  }
}
