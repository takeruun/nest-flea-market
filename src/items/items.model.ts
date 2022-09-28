import { ItemStatus } from './item-status.enum';

export interface Item {
  id: string;
  name: string;
  price: number;
  describe: string;
  status: ItemStatus;
}
