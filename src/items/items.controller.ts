import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  // /items/:id でパスを指定する
  @Get(':id')
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
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

    return this.itemsService.create(item);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string): Item {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.itemsService.delete(id);
  }
}
