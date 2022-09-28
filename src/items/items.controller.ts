import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { Item } from './items.model';
import { ItemsService } from './items.service';

// @Controller('xxx') デコレーターをつける
// items がパスになる
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // HTTP メソッド デコレーターをつける
  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('describe') describe: string,
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      describe,
      status: ItemStatus.ON_SALE,
    };
    console.log(item);

    return this.itemsService.create(item);
  }
}
