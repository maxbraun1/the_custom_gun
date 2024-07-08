import { IsEmail, IsString } from 'class-validator';

export class CreateSupportDTO {
  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}
