import { feedback } from '@prisma/client';
import { Transform } from 'class-transformer';

export class FeedbackEntity implements feedback {
  id: string;
  date: Date;
  order_id: string;
  seller_id: string;
  buyer_id: string;

  @Transform(({ value }) => Number(value))
  score: number;

  message: string;

  constructor(partial: Partial<FeedbackEntity>) {
    Object.assign(this, partial);
  }
}
