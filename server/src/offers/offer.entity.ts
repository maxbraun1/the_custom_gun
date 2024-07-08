import { listings, offers } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Transform } from 'class-transformer';
import { ListingEntity } from 'src/listings/listing.entity';

export class OfferEntity implements offers {
  id: string;
  date: Date;
  listing_id: string;

  @Transform(({ value }) => new ListingEntity(value))
  listing: listings;

  @Exclude()
  buyer_id: string;

  @Exclude()
  seller_id: string;

  @Transform(({ value }) => value.toNumber())
  amount: Decimal;

  accepted: boolean;

  quantity: number;

  constructor(partial: Partial<OfferEntity>) {
    Object.assign(this, partial);
  }
}
