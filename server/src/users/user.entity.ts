import { users } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Transform } from 'class-transformer';

export class UserEntity implements users {
  @Exclude()
  id: string;

  ref: string;

  verified: boolean;

  @Exclude()
  provider: string;

  email: string;
  username: string;

  @Exclude()
  password: string;

  account_created_date: Date;

  @Exclude()
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

  @Exclude()
  date_of_birth: Date;

  @Exclude()
  gender: string;

  account_status: string;

  @Exclude()
  role: string;

  @Exclude()
  google_id: string;

  @Transform(({ value }) => Number(value))
  rating: Decimal;

  @Exclude()
  default_ffl_id: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
