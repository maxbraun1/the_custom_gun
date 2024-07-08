import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDTO } from './dto/create-feedback.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get(':username')
  async getUserFeedback(@Param('username') username: string) {
    return await this.feedbackService.getUserFeedback(username);
  }

  @Post('buyer')
  @UseGuards(AuthenticatedGuard)
  async createFeedback(@Body() feedback: CreateFeedbackDTO, @Req() request) {
    return await this.feedbackService.createFeedback(feedback, request.user.id);
  }
}
