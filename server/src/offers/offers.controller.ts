import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { GetOffersDTO } from './dto/get-offers.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  async createOffer(@Body() offer: CreateOfferDTO, @Req() request) {
    return this.offersService.createOffer(offer, request.user.id);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getUserOffers(@Query() query: GetOffersDTO, @Req() request) {
    return await this.offersService.getUserOffers(
      request.user.id,
      Number(query.per),
      Number(query.page),
      query.status,
    );
  }

  @Get('/check/:listing_id')
  @UseGuards(AuthenticatedGuard)
  async offerAlreadyMade(
    @Param('listing_id') listing_id: string,
    @Req() request,
  ) {
    return await this.offersService.offerAlreadyMade(
      request.user.id,
      listing_id,
    );
  }

  @Put('accept')
  @UseGuards(AuthenticatedGuard)
  async acceptOffer(@Body() body: { offerID: string }, @Req() request) {
    return this.offersService.acceptOffer(body.offerID, request.user.id);
  }

  @Put('reject')
  @UseGuards(AuthenticatedGuard)
  async declineOffer(@Body() body: { offerID: string }, @Req() request) {
    return this.offersService.rejectOffer(body.offerID, request.user.id);
  }
}
