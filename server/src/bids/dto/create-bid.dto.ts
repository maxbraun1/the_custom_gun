import { Decimal } from '@prisma/client/runtime/library';
import { IsNumber, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateBidDTO {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(100000)
  amount: number;

  @IsString()
  listing_id: string;
}
