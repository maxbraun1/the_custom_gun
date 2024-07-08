import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UploadService } from './upload/upload.service';
import { ListingsService } from './listings/listings.service';

@Injectable()
export class AppService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly listingsService: ListingsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  deleteUnlinkedImages() {
    this.uploadService.deleteUnlinkedImages();
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  endListings() {
    this.listingsService.endListings();
  }
}
