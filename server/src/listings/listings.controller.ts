import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  UnauthorizedException,
  Put,
  Query,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { ListingEntity } from './listing.entity';
import { EditListingResponseDTO } from './dto/edit-listing-response.dto';
import { ActiveAccountGuard } from 'src/auth/guards/activeAccountGuard';
import { SearchListingsDTO } from './dto/search-listings.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get('listing/:listingRef')
  async getListing(@Param('listingRef') listingRef) {
    return new ListingEntity(await this.listingsService.getListing(listingRef));
  }

  @UseGuards(AuthenticatedGuard)
  @Get('update/:ref')
  async getFullListing(@Param('ref') ref, @Req() request) {
    const listing = await this.listingsService.getFullListing(
      ref,
      request.user.id,
    );
    return new EditListingResponseDTO(listing);
  }

  @Get('endlisting/:listingRef')
  @UseGuards(AuthenticatedGuard)
  async EndListing(@Req() request, @Param('listingRef') listingRef) {
    if (!request.user.id) throw new UnauthorizedException();
    return await this.listingsService.endListingEarly(
      listingRef,
      request.user.id,
    );
  }

  @Get('user')
  async userListings(@Query() params) {
    let page = Number(params.page);
    if (!page) page = 1;
    const response = await this.listingsService.getPublicUserListings(
      params.username,
      page,
      Number(params.per),
    );
    if (response.count === 0) return null;
    const listings = response.listings.map(
      (listing) => new ListingEntity(listing),
    );
    console.log(listings);
    return { listings, count: response.count };
  }

  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  async updateListing(@Param('id') id, @Req() request, @Body() body) {
    await this.listingsService.updateListing(body, id, request.user.id);
    return true;
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  // TODO: Create DTO and validation for incoming listing data
  async createListing(@Body() body, @Req() request) {
    console.log(body);
    const listingData = await this.listingsService.createListing(
      body,
      request.user.id,
    );
    await this.listingsService.registerListingImages(
      body.images,
      listingData.id,
    );
    return new ListingEntity(listingData);
  }

  @Post('userlistings')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(ActiveAccountGuard)
  async getUserListings(@Body() body, @Req() request) {
    const user_id = request.user.id;
    let page = Number(body.page);
    const per = body.per;
    if (!page) page = 1;
    const settings = body;
    return await this.listingsService.getUserListings(
      settings,
      user_id,
      page,
      per,
    );
  }

  @Post('imageUpload')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadListingImages(@UploadedFile() image: Express.Multer.File) {
    const result = await this.listingsService.listingImageUpload(image);
    return result;
  }

  @Get('latest')
  async getLatestListings() {
    let listings = await this.listingsService.getLatestListings();
    return listings.map((listing) => new ListingEntity(listing));
  }

  @Get('search')
  async searchListings(@Query() query: SearchListingsDTO) {
    console.log(query);
    return await this.listingsService.searchListings(
      query.term,
      Number(query.per),
      Number(query.page),
      query.listing_type,
      query.frame_finish,
      query.item_type,
      query.brand,
      query.caliber,
      query.condition,
    );
  }
}
