import { users } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude } from 'class-transformer';

export class OrderSellerDTO implements users {
  @Exclude()
  id: string;

  number: number;

  ref: string;

  @Exclude()
  provider: string;

  email: string;

  @Exclude()
  verified: boolean;

  username: string;

  @Exclude()
  password: string;

  @Exclude()
  account_created_date: Date;

  @Exclude()
  last_sign_in: Date;

  first_name: string;
  last_name: string;
  company: string;

  @Exclude()
  billing_name: string;

  @Exclude()
  billing_address_1: string;

  @Exclude()
  billing_address_2: string;

  @Exclude()
  billing_city: string;

  @Exclude()
  billing_state: string;

  @Exclude()
  billing_zip: string;

  @Exclude()
  date_of_birth: Date;

  @Exclude()
  gender: string;

  @Exclude()
  account_status: string;

  @Exclude()
  role: string;

  @Exclude()
  google_id: string;

  rating: Decimal;

  @Exclude()
  default_ffl_id: string;

  constructor(partial: Partial<OrderSellerDTO>) {
    Object.assign(this, partial);
  }
}
