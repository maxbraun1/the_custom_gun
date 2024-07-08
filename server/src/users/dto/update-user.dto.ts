import { IsAlpha, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsAlpha()
  first_name: string;

  @IsAlpha()
  last_name: string;

  @IsString()
  username: string;

  @IsString()
  company: string;
}
