import { CrudRepository } from '../../../shared/domain/repositories/crudRepository';
import { OrderType } from '../entities/order-type.entity';

export interface OrderTypeRepository extends CrudRepository<OrderType> {
  getByName: (name: string) => Promise<OrderType | null>;
}
