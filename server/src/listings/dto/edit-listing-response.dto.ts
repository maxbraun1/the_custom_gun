import { listings } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';

export class EditListingResponseDTO implements listings {
  id: string;
  created_date: Date;
  end_date: Date;
  ref: string;
  user_id: string;
  status: string;
  has_reserve: boolean;
  reserve_met: boolean;

  @Transform(({ value }) => Number(value))
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

  @Transform(({ value }) => Number(value))
  reserve_price: Decimal;

  @Transform(({ value }) => Number(value))
  buy_now_price: Decimal;

  is_free_shipping: boolean;

  @Transform(({ value }) => Number(value))
  shipping_charge: Decimal;

  seller_state: string;

  images: Array<string>;
  thumbnail: string;

  brand_id: string;
  caliber_id: string;
  customized_by: string;

  constructor(partial: Partial<EditListingResponseDTO>) {
    Object.assign(this, partial);
  }
}
