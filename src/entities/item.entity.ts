import { ItemStatus } from 'src/items/item-status.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  describe: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  // User でどのように Item と紐づいているか
  @ManyToOne(() => User, (user) => user.items)
  user: User;

  // 上記で DB に userId が追加されるが typeorm 上はまだないので追加する
  @Column()
  userId: string;
}
