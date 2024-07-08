import { IsAlpha, IsEmail, IsString } from 'class-validator';

export class LocalSignupDTO {
  @IsAlpha()
  @IsString()
  first_name: string;

  @IsAlpha()
  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
