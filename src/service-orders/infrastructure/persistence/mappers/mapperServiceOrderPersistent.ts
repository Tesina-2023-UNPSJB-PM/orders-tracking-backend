import { ServiceOrder } from 'src/service-orders/domain/entities/serviceOrder.entity';
import { ServiceOrderPersistent } from '../entities/serviceOrderPersistent';
import { MapperOrderExecutionPersistent } from './mapperOrderExecutionPersistent';
import { MapperOrderTypePersistent } from './mapperOrderType';
import { MapperOrderLocationPersistent } from './mapperOrderLocationPersistent';
import { MapperCustomerPersistent } from './mapperCustomerPersistent';

export class MapperServiceOrderPersistent {
  private mapperOrderExecution: MapperOrderExecutionPersistent;
  private mapperOrderType: MapperOrderTypePersistent;
  private mapperOrderLocation: MapperOrderLocationPersistent;
  private mapperCustomer: MapperCustomerPersistent;
  constructor() {
    this.mapperOrderExecution = new MapperOrderExecutionPersistent();
    this.mapperOrderType = new MapperOrderTypePersistent();
    this.mapperOrderLocation = new MapperOrderLocationPersistent();
    this.mapperCustomer = new MapperCustomerPersistent();
  }

  mapToServiceOrder(row: ServiceOrderPersistent): ServiceOrder {
    return ServiceOrder.create(
      {
        number: row.number,
        description: row.description,
        creationTime: row.creationTime,
        customer: row.customer
          ? this.mapperCustomer.mapToCustomer(row.customer)
          : undefined,
        detail: row.detail,
        execution: row.execution
          ? this.mapperOrderExecution.mapToOrderExecution(row.execution)
          : undefined,
        priority: row.priority,
        status: row.status,
        type: row.type
          ? this.mapperOrderType.mapToOrderType(row.type)
          : undefined,
        destination: row.destination
          ? this.mapperOrderLocation.mapToOrderLocation(row.destination)
          : undefined,
      },
      row.id,
    );
  }

  mapToServiceOrderPersistent(entity: ServiceOrder): ServiceOrderPersistent {
    const result = new ServiceOrderPersistent();
    const entityValues = entity.getValues();

    result.id = entity.id;
    result.description = entityValues.description;
    result.number = entityValues.number;
    result.creationTime = entityValues.creationTime;
    result.priority = entityValues.priority;
    result.status = entityValues.status;
    result.type = entityValues.type
      ? this.mapperOrderType.mapToOrderTypePersistent(entityValues.type)
      : undefined;
    result.execution = entityValues.execution
      ? this.mapperOrderExecution.mapToOrderExecutionPersistent(
          entityValues.execution,
        )
      : undefined;
    const customerId = entityValues.customerId ?? entityValues.customer?.id;
    result.customer = { id: customerId };
    result.destination = entityValues.destination
      ? this.mapperOrderLocation.mapToOrderLocationPersistent(
          entityValues.destination,
        )
      : undefined;

    result.detail = entityValues.detail;
    return result;
  }
}
