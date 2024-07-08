import { IsOptional, IsString } from 'class-validator';

export class GetOffersDTO {
  @IsString()
  page: string;

  @IsString()
  per: string;

  @IsOptional()
  @IsString()
  status: 'any' | 'pending' | 'accepted' | 'rejected' | null;
}
