import { CrudRepository } from 'src/shared/domain/repositories/crudRepository';
import { OrderExecution } from '../entities/orderExecution.entity';
import { Employee } from '../entities/employee.entity';
import { Sector } from '../entities/sector.entity';

export interface OrderExecutionRepository
  extends CrudRepository<OrderExecution> {
  getByExecutor: (executor: Employee) => Promise<OrderExecution[] | null>;
  getBySector: (sector: Sector) => Promise<OrderExecution[] | null>;
}
