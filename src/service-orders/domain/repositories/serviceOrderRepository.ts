import { CrudRepository } from '../../../shared/domain/repositories/crudRepository';
import { ServiceOrder } from '../entities/serviceOrder.entity';

export interface ServiceOrderRepository extends CrudRepository<ServiceOrder> {
  getByServiceOrderNumber: (number: string) => Promise<ServiceOrder | null>;
}
