import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateOfferDTO {
  @IsString()
  listing_id: string;

  @IsNumber()
  amount: number;

  @IsInt()
  quantity: number;
}
