import { listings } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Transform } from 'class-transformer';
import { BidsEntity } from 'src/bids/bids.entity';

export class ListingEntity implements listings {
  id: string;

  created_date: Date;
  end_date: Date;
  ref: string;
  has_reserve: boolean;
  reserve_met: boolean;

  @Exclude()
  user_id: string;

  status: string;

  @Transform(({ value }) => value.toNumber())
  current_bid: Decimal;

  bid_count: number;
  title: string;
  description: string;
  condition: string;
  upc: string;
  sku: string;
  serial_no: string;
  item_type: string;
  is_engraved: boolean;
  frame_finish_id: string;
  secondary_finish_id: string;
  listing_type: string;
  duration: number;

  @Transform(({ value }) => Number(value))
  price: Decimal;

  quantity: number;
  accept_offers: boolean;

  @Transform(({ value }) => Number(value))
  starting_bid: Decimal;

  @Exclude()
  reserve_price: Decimal;

  @Transform(({ value }) => Number(value))
  buy_now_price: Decimal;

  is_free_shipping: boolean;

  @Transform(({ value }) => Number(value))
  shipping_charge: Decimal;

  seller_state: string;

  bids?: BidsEntity;

  brand_id: string;
  caliber_id: string;
  customized_by: string;

  constructor(partial: Partial<ListingEntity>) {
    Object.assign(this, partial);
  }
}
