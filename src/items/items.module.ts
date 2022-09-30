import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Item } from 'src/entities/item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), AuthModule],
  exports: [TypeOrmModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
