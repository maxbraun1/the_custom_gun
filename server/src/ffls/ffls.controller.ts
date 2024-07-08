import { Controller, Get, Param } from '@nestjs/common';
import { FflsService } from './ffls.service';

@Controller('ffls')
export class FflsController {
  constructor(private readonly fflsService: FflsService) {}

  @Get('/find/:term')
  getFFLsByZip(@Param('term') term: string) {
    if (term.trim().length < 2 || term === null) return null;
    return this.fflsService.searchFFLs(term);
  }

  @Get(':id')
  getFFL(@Param('id') id: string) {
    return this.fflsService.getFFL(id);
  }
}
