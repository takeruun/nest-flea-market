import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { DeleteResult } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './items.model';
import { ItemsService } from './items.service';

// @Controller('xxx') デコレーターをつける
// items がパスになる
@Controller('items')
@UseInterceptors(ClassSerializerInterceptor) // entity に記述されている Exclude を実行する
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // HTTP メソッド デコレーターをつける
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  // /items/:id でパスを指定する
  // パラメータにバリデーションを設定する。@Param の第二引数に設定する。
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
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
  @UseGuards(JwtAuthGuard) // JwtAuthGuard で リクエストを検証する
  create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.itemsService.create(createItemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.itemsService.updateStatus(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.itemsService.delete(id, user);
  }
}
