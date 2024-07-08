import { Optional } from '@nestjs/common';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateFeedbackDTO {
  @IsString()
  orderNumber: string;

  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @IsString()
  @Optional()
  message: string;
}
