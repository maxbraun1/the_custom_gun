import { users } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude } from 'class-transformer';

export class UserEntity implements users {
  id: string;
  ref: string;
  provider: string;
  email: string;
  verified: boolean;
  username: string;
  account_created_date: Date;
  last_sign_in: Date;
  first_name: string;
  last_name: string;
  company: string;
  billing_name: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  date_of_birth: Date;
  gender: string;
  account_status: string;
  role: string;
  google_id: string;

  @Exclude()
  password: string;

  rating: Decimal;
  default_ffl_id: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
