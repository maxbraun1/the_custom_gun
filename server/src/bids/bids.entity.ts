import { bids } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { ListingEntity } from 'src/listings/listing.entity';

export class BidsEntity implements bids {
  id: string;
  date: Date;
  listing?: ListingEntity;
  listing_id: string;
  user_id: string;
  @Transform(({ value }) => Number(value))
  amount: Decimal;

  constructor(partial: Partial<BidsEntity>) {
    Object.assign(this, partial);
  }
}
