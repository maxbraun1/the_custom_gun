import { listings, orders, users } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Transform } from 'class-transformer';
import { OrderListingDTO } from './order-listing.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MarkOrderShippedDTO {
  @IsNumber()
  order_number: number;

  @IsString()
  @IsOptional()
  tracking_number: string;

  constructor(partial: Partial<MarkOrderShippedDTO>) {
    Object.assign(this, partial);
  }
}
