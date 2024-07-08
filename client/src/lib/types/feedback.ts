import { user } from "./user";
import { order } from "./order";

export interface feedback {
  id: string;
  date: Date;
  order_id: string;
  order: order;
  seller_id: string;
  buyer_id: string;
  buyer: user;
  score: number;
  message: string;
}
