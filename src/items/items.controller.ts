import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';

// @Controller('xxx') デコレーターをつける
// items がパスになる
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // HTTP メソッド デコレーターをつける
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}
