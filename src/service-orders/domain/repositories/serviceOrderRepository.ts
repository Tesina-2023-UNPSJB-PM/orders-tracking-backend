import { CrudRepository } from '../../../shared/domain/repositories/crudRepository';
import { ServiceOrder } from '../entities/serviceOrder.entity';
import { OrderStatus } from '../enums/service-order-enums';

export interface ServiceOrderRepository extends CrudRepository<ServiceOrder> {
  getByServiceOrderNumber: (number: string) => Promise<ServiceOrder | null>;
  getByFilters: (
    filters: FindAllServiceOrderFilters,
  ) => Promise<ServiceOrder[]>;
}

export interface FindAllServiceOrderFilters {
  employeeId?: number;
  customerId?: number;
  statusCode?: OrderStatus;
  creationDate?: Date;
}
