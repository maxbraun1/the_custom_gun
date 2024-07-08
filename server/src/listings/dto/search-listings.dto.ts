import { IsOptional, IsString } from 'class-validator';

export class SearchListingsDTO {
  @IsOptional()
  @IsString()
  term: string;

  @IsString()
  page: string;

  @IsString()
  per: string;

  @IsOptional()
  @IsString()
  listing_type: 'any' | 'auction' | 'fixed' | null;

  @IsOptional()
  @IsString()
  frame_finish: string | null;

  @IsOptional()
  @IsString()
  item_type: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  caliber: string;

  @IsOptional()
  @IsString()
  condition: 'any' | 'new' | 'used' | null;
}
