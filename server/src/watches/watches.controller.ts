import {
  Controller,
  Post,
  Body,
  Delete,
  Req,
  UseGuards,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { WatchesService } from './watches.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('watches')
export class WatchesController {
  constructor(private readonly watchesService: WatchesService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Req() request, @Body() createWatchDto: CreateWatchDto) {
    let user_id = request.user.id;
    return this.watchesService.create(user_id, createWatchDto.listing_id);
  }
  ß;

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getWatches(@Req() request, @Query() query) {
    return await this.watchesService.getWatches(
      request.user.id,
      Number(query.per),
      Number(query.page),
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Get('check/:listing_id')
  checkIsWatched(@Param('listing_id') listing_id, @Req() request) {
    let user_id = request.user.id;
    return this.watchesService.checkIsWatched(user_id, listing_id);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':listing_id')
  unwatch(@Req() request, @Param('listing_id') listing_id) {
    let user_id = request.user.id;
    return this.watchesService.delete(user_id, listing_id);
  }
}
