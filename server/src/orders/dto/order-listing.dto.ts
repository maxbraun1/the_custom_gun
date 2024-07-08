import { listings, orders, users } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { OrderSellerDTO } from './order-seller.dto';
import { Exclude, Transform } from 'class-transformer';

export class OrderListingDTO implements listings {
  id: string;
  has_reserve: boolean;
  reserve_met: boolean;

  @Exclude()
  created_date: Date;

  end_date: Date;
  ref: string;

  @Exclude()
  user_id: string;
  status: string;

  @Transform(({ value }) => Number(value))
  current_bid: Decimal;

  bid_count: number;
  title: string;

  @Exclude()
  description: string;

  condition: string;
  upc: string;

  @Exclude()
  sku: string;

  @Exclude()
  serial_no: string;

  @Exclude()
  item_type: string;

  @Exclude()
  is_engraved: boolean;

  @Exclude()
  frame_finish_id: string;

  @Exclude()
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

  @Transform(({ value }) => new OrderSellerDTO(value))
  user: users;

  brand_id: string;
  caliber_id: string;
  customized_by: string;

  constructor(partial: Partial<OrderListingDTO>) {
    Object.assign(this, partial);
  }
}
