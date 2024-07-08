import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutOrderDTO } from './dto/checkout-order.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { CheckoutListingDTO } from './dto/checkout-listing.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('order')
  @UseGuards(AuthenticatedGuard)
  async checkoutOrder(@Body() body: CheckoutOrderDTO, @Req() request) {
    return this.checkoutService.checkoutOrder(body, request.user.id);
  }

  @Post('listing')
  @UseGuards(AuthenticatedGuard)
  async checkoutListing(@Body() body: CheckoutListingDTO, @Req() request) {
    return this.checkoutService.checkoutListing(body, request.user.id);
  }
}
