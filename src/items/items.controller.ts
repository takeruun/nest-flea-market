import { Controller, Get } from '@nestjs/common';

// @Controller('xxx') デコレーターをつける
// items がパスになる
@Controller('items')
export class ItemsController {
  // HTTP メソッド デコレーターをつける
  @Get()
  findAll() {
    return 'this is findAll';
  }
}
