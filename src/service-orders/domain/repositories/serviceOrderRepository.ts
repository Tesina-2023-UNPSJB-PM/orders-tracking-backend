import { OrderExecutionPersistent } from 'src/service-orders/infrastructure/persistence/entities/orderExecutionPersistent';
import { CrudRepository } from '../../../shared/domain/repositories/crudRepository';
import { ServiceOrder } from '../entities/serviceOrder.entity';
import { OrderStatus } from '../enums/service-order-enums';
import { PageOptionsDto } from 'src/shared/dto/pagination/page-options.dto';
import { PageDto } from 'src/shared/dto/pagination/page.dto';
export interface ServiceOrderRepository extends CrudRepository<ServiceOrder> {
  getByServiceOrderNumber: (number: string) => Promise<ServiceOrder | null>;
  getByFilters: (
    filters: FindAllServiceOrderFilters,
    pageOptionsDto: PageOptionsDto,
  ) => Promise<PageDto<ServiceOrder>>;

  getOrderExecutionById: (
    id: number,
  ) => Promise<OrderExecutionPersistent | null>;
}

export interface FindAllServiceOrderFilters {
  employeeId?: number;
  customerId?: number;
  statusCode?: OrderStatus;
  creationDate?: Date;
}
