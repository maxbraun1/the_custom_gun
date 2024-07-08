import { user } from "./user";
import { listing } from "./listing";

export interface bid {
  id: string;
  date: Date;
  listing: listing;
  user: user;
  amount: number;
}
