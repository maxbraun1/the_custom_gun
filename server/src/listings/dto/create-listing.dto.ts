import { Decimal } from '@prisma/client/runtime/library';

export class CreateListingDTO {
  title: string;
  description: string;
  condition: string;
  upc: string;
  sku?: string;
  serial_no?: string;
  is_engraved: boolean;
  primary_finish_id: string;
  item_type: string;
  customized_by: string;
  thumbnail: string;
  listing_type: string;
  price?: number;
  quantity?: number;
  duration: number;
  accept_offers: boolean;
  is_free_shipping: boolean;
  shipping_charge?: number;
  seller_state: string;
  reserve_price?: number;
  buy_now_price?: number;

  images: Array<string>;
}
