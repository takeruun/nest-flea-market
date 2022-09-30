import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { v4 as uuid } from 'uuid';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

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

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const item = {
      id: uuid(),
      ...createItemDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: ItemStatus.ON_SALE,
      user,
      userId: user.id,
    };

    await this.itemsRepository.save(item);

    return item;
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('それ。自分の商品やで');
    }

    item.status = ItemStatus.SOLED_OUT;
    item.updatedAt = new Date().toISOString();

    await this.itemsRepository.update(item.id, item);

    return item;
  }

  async delete(id: string, user: User): Promise<DeleteResult> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('それ。自分の商品やない');
    }
    return await this.itemsRepository.delete(id);
  }
}
