import { orders } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';

export class OrderEntity implements orders {
  id: string;
  number: number;
  ship_to_ffl_id: string;
  date: Date;
  status: string;

  @Transform(({ value }) => Number(value))
  price_per_item: Decimal;

  @Transform(({ value }) => Number(value))
  total: Decimal;

  @Transform(({ value }) => Number(value))
  subtotal: Decimal;

  @Transform(({ value }) => Number(value))
  fees: Decimal;

  @Transform(({ value }) => Number(value))
  shipping_price: Decimal;

  quantity: number;
  is_paid: boolean;
  paid_date: Date;
  is_shipped: boolean;
  shipped_date: Date;
  is_received: boolean;
  received_date: Date;
  tracking_number: string;
  listing_id: string;
  buyer_user_id: string;
  seller_user_id: string;
  billing_name: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  feedback_submitted: boolean;
  checkout_completed: boolean;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
