import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CheckoutOrderDTO {
  @IsString()
  ffl: string;

  @IsString()
  fullName: string;

  @IsString()
  address1: string;

  @IsOptional()
  address2: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip: string;

  @IsString()
  cardNumber: string;

  @IsString()
  expDateMonth: string;

  @IsString()
  expDateYear: string;

  @IsString()
  cvv: string;

  @IsNumber()
  orderNumber: number;

  constructor(partial: Partial<CheckoutOrderDTO>) {
    Object.assign(this, partial);
  }
}
