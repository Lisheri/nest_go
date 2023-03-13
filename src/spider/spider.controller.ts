import { Controller, Get } from '@nestjs/common';
import { SpiderService } from './spider.service';
const targetUrl = 'https://www.xgmn02.com/Cosplay/Cosplay16527';
@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}

  @Get()
  async findAll() {
    return this.spiderService.findAll();
  }
}
