import { listing } from "./listing";
import { user } from "./user";

export interface order {
  id: string;
  number: number;
  ref: string;
  date: Date;
  total: number;
  subtotal: number;
  fees: number;
  shipping_price: number;
  price_per_item: number;
  is_paid: boolean;
  is_shipped: boolean;
  tracking_number: string;
  listing_id: string;
  status: string;
  ship_to_ffl_id: string;
  ship_to_ffl: ffl;
  billing_name: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  amount: number;
  quantity: number;
  buyer_user_id: string;
  seller_user_id: string;
  seller: user;
  buyer: user;
  listing: listing;
  feedback_submitted: boolean;
  checkout_completed: boolean;
}
