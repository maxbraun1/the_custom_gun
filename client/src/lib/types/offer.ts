import { listing } from "./listing";

export interface offer {
  id: string;
  date: Date;
  listing: listing;
  seller_id: string;
  amount: number;
  accepted: boolean;
}
