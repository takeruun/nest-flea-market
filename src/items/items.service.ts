import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { v4 as uuid } from 'uuid';
import { Item } from 'src/entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemsRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  // create(item: Item): Item {
  //   this.items.push(item);
  //   return item;
  // }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item: Item = {
      id: uuid(),
      ...createItemDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: ItemStatus.ON_SALE,
    };

    await this.itemsRepository.save(item);

    return item;
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLED_OUT;
    item.updatedAt = new Date().toISOString();

    await this.itemsRepository.update(item.id, item);

    return item;
  }

  async delete(id: string): Promise<void> {
    this.itemsRepository.delete(id);
  }
}
