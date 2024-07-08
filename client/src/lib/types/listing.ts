interface thumbnail {
  id: string;
  uploaded_date: string;
  url: string;
  listing_id: string;
  thumbnail_for_id: string;
}

export interface listing {
  id?: string;
  ref: string;
  user_id: string;
  status?: string;
  created_date: Date;
  end_date: Date;
  current_bid: number;
  bid_count: number;
  has_reserve: boolean;
  reserve_met: boolean;

  // description
  title: string;
  description: string;
  condition: string;
  upc: string;
  sku: string;
  serial_no: string;
  item_type: string;
  is_engraved: boolean;
  frame_finish: { id: string; value: string; display: string };
  frame_finish_id: string;
  customized_by: string;

  // images
  images: Array<{
    id: string;
    uploaded_date: Date;
    url: string;
    listing_id: string;
    thumbnail_for_id: null | string;
    index: number;
  }>;
  thumbnail: thumbnail;

  // options
  listing_type: string;
  price: number;
  quantity: number;
  accept_offers: boolean;
  listing_duration: number;
  starting_bid: number;
  reserve_price: number;
  buy_now_price: number;

  // payment & shipping
  is_free_shipping: boolean;
  shipping_charge: number;
  seller_state: string;

  brand: {
    id: string;
    value: string;
    display: string;
  };

  caliber: {
    id: string;
    value: string;
    display: string;
  };

  // user object
  user: {
    username: string;
    first_name: string;
    last_name: string;
    ref: string;
  };
}
