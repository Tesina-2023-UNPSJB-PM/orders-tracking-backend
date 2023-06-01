import { CrudRepository } from '../../../shared/domain/repositories/crudRepository';
import { OrderType } from '../entities/orderType.entity';

export interface OrderTypeRepository extends CrudRepository<OrderType> {
  getByName: (name: string) => Promise<OrderType | null>;
}
