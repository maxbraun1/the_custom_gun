import { Controller, Get, Request } from '@nestjs/common';
import { CalibersService } from './calibers.service';

@Controller('calibers')
export class CalibersController {
  constructor(private readonly calibersService: CalibersService) {}

  @Get()
  getCalibers() {
    return this.calibersService.getCalibers();
  }
}
