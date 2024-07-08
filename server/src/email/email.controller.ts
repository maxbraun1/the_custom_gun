import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('add')
  addUser(@Body() body, @Req() request) {
    console.log(body);
    //this.emailService.addUser(body.email, body.first_name, body.last_name);
    this.emailService.sendVerificationEmail(1234, 'maxbraun175@yahoo.com');
    this.emailService.sendPasswordResetEmail('324232', 'maxbraun175@yahoo.com');

    return true;
  }

  @Get('marketing/check')
  @UseGuards(AuthenticatedGuard)
  checkMarketingSubscription(@Req() request) {
    return this.emailService.checkMarketingSubscription(request.user.email);
  }

  @Put('marketing/set-subscription')
  @UseGuards(AuthenticatedGuard)
  subscribeToMarketingEmails(@Req() request, @Body() body) {
    if (body.subscribe) {
      return this.emailService.subscribeToMarketingEmails(request.user.email);
    } else {
      return this.emailService.unsubscribeFromMarketingEmails(
        request.user.email,
      );
    }
  }
}
