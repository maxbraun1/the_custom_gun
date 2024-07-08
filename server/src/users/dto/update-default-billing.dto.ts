import {
  IsAlpha,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateDefaultBillingDto {
  @IsString()
  billing_name: string;

  @IsString()
  billing_address_1: string;

  @IsString()
  @IsOptional()
  billing_address_2: string;

  @IsString()
  @IsAlpha()
  billing_city: string;

  @IsString()
  @IsAlpha()
  @Length(2)
  billing_state: string;

  @IsString()
  @MinLength(5)
  @MaxLength(10)
  billing_zip: string;
}
