import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './items.model';
import { ItemsService } from './items.service';

// @Controller('xxx') デコレーターをつける
// items がパスになる
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // HTTP メソッド デコレーターをつける
  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  // /items/:id でパスを指定する
  // パラメータにバリデーションを設定する。@Param の第二引数に設定する。
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return this.itemsService.findById(id);
  }

  // @Post()
  // create(
  //   @Body('id') id: string,
  //   @Body('name') name: string,
  //   @Body('price') price: number,
  //   @Body('describe') describe: string,
  // ): Item {
  //   const item: Item = {
  //     id,
  //     name,
  //     price,
  //     describe,
  //     status: ItemStatus.ON_SALE,
  //   };

  //   return this.itemsService.create(item);
  // }

  // DTO を使用するバージョン
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.itemsService.delete(id);
  }
}
