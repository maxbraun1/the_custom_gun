import { users } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Transform } from 'class-transformer';
import { IsAlpha, IsString } from 'class-validator';

export class GetPublicUserDTO implements users {
  @Exclude()
  id: string;

  ref: string;

  @Exclude()
  provider: string;

  @Exclude()
  email: string;

  verified: boolean;

  @Exclude()
  password: string;

  account_created_date: Date;

  @Exclude()
  last_sign_in: Date;

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

  first_name: string;

  @Transform(({ value }: { value: string }) => value.charAt(0) + '.')
  last_name: string;

  username: string;

  company: string;

  @Transform(({ value }) => Number(value))
  rating: Decimal;

  @Exclude()
  default_ffl_id: string;

  constructor(partial: Partial<GetPublicUserDTO>) {
    Object.assign(this, partial);
  }
}
