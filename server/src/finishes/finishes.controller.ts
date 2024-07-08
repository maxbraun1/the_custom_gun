import { Controller, Get, Request } from '@nestjs/common';
import { FinishesService } from './finishes.service';

@Controller('finishes')
export class FinishesController {
  constructor(private readonly finishesService: FinishesService) {}

  @Get()
  getFinishes() {
    return this.finishesService.getFinishes();
  }
}
