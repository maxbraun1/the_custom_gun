import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { CreateBidDTO } from './dto/create-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  // TODO: create guard for making sure user is verfied and has complete account information
  @Post()
  @UseGuards(AuthenticatedGuard)
  async create(@Body() body: CreateBidDTO, @Req() request) {
    return await this.bidsService.create(
      request.user.id,
      body.listing_id,
      body.amount,
    );
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getBids(@Req() request, @Query() query) {
    return await this.bidsService.getBids(
      request.user.id,
      Number(query.per),
      Number(query.page),
    );
  }
}
