import { Body, Controller, Post } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportDTO } from './dto/create-support.dto';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  async createSupport(@Body() body: CreateSupportDTO) {
    return await this.supportService.createSupport(
      body.email,
      body.subject,
      body.message,
      'support',
    );
  }

  @Post('feature')
  async createFeatureRequest(@Body() body: CreateSupportDTO) {
    return await this.supportService.createSupport(
      body.email,
      body.subject,
      body.message,
      'feature',
    );
  }

  @Post('issue')
  async createBugReport(@Body() body: CreateSupportDTO) {
    return await this.supportService.createSupport(
      body.email,
      body.subject,
      body.message,
      'bug',
    );
  }
}
