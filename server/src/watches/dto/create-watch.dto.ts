import { IsString } from 'class-validator';

export class CreateWatchDto {
  @IsString()
  listing_id: string;
}
