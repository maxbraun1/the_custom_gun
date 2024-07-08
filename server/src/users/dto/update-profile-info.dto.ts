import { IsAlpha, IsOptional, IsString } from 'class-validator';

export class UpdateProfileInfoDto {
  @IsAlpha()
  first_name: string;

  @IsAlpha()
  last_name: string;

  @IsString()
  company: string;
}
