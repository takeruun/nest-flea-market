import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserStatus } from 'src/auth/user-status.enum';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;

  // 関連先で紐付けされるプロパティを指定する
  // Item でどのように User と紐づいているか
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
