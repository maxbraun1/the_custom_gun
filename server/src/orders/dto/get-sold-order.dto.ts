import { listings, orders, users } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Transform } from 'class-transformer';
import { OrderListingDTO } from './order-listing.dto';

export class GetSoldOrderDTO implements orders {
  id: string;
  number: number;
  ref: string;
  date: Date;

  @Transform(({ value }) => Number(value))
  total: Decimal;

  @Transform(({ value }) => Number(value))
  subtotal: Decimal;

  @Transform(({ value }) => Number(value))
  fees: Decimal;

  @Transform(({ value }) => Number(value))
  shipping_price: Decimal;

  @Transform(({ value }) => Number(value))
  price_per_item: Decimal;

  is_paid: boolean;
  paid_date: Date;
  is_shipped: boolean;
  shipped_date: Date;
  is_received: boolean;
  received_date: Date;
  tracking_number: string;
  listing_id: string;
  status: string;
  ship_to_ffl_id: string;
  billing_name: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;

  @Transform(({ value }) => Number(value))
  amount: Decimal;

  quantity: number;

  @Exclude()
  buyer_user_id: string;

  @Exclude()
  seller_user_id: string;

  @Transform(({ value }) => new OrderListingDTO(value))
  listing: listings;

  feedback_submitted: boolean;

  checkout_completed: boolean;

  constructor(partial: Partial<GetSoldOrderDTO>) {
    Object.assign(this, partial);
  }
}
