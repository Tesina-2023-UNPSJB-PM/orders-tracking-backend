import { OrderExecution } from 'src/service-orders/domain/entities/orderExecution.entity';
import { OrderExecutionPersistent } from '../entities/orderExecutionPersistent';
import { MapperEmployeePersistent } from './mapperEmployePersistent';
import { MapperSectorPersistent } from './mapperSectorPersistent';

export class MapperOrderExecutionPersistent {
  private mapperEmployee: MapperEmployeePersistent;
  private mapperSector: MapperSectorPersistent;

  constructor() {
    this.mapperEmployee = new MapperEmployeePersistent();
    this.mapperSector = new MapperSectorPersistent();
  }
  mapToOrderExecution(row: OrderExecutionPersistent): OrderExecution {
    return OrderExecution.create(
      {
        observations: row.observations,
        assignedTime: row.assignedTime,
        estimatedResolutionTime: row.estimatedResolutionTime,
        resolutionTime: row.resolutionTime,
        executor: row.executor
          ? this.mapperEmployee.mapToEmployee(row.executor)
          : undefined,
        assignedSector: row.assignedSector
          ? this.mapperSector.mapToSector(row.assignedSector)
          : undefined,
      },
      row.id,
    );
  }

  mapToOrderExecutionPersistent(
    entity: OrderExecution,
  ): OrderExecutionPersistent {
    const result = new OrderExecutionPersistent();
    result.id = entity.id;
    result.observations = entity.observations;
    result.assignedTime = entity.assignedTime;
    result.estimatedResolutionTime = entity.estimatedResolutionTime;
    result.resolutionTime = entity.resolutionTime;
    result.assignedSector = entity.assignedSector
      ? this.mapperSector.mapToSectorPersistent(entity.assignedSector)
      : undefined;
    result.executor = entity.executor
      ? this.mapperEmployee.mapToEmployeePersistent(entity.executor)
      : undefined;

    return result;
  }
}
