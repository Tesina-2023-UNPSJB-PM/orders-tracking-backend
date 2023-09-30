import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderRequest } from 'src/service-orders/dto/serviceOrderReq.dto';
import { ServiceOrderFactory } from '../factories/serviceOrderFactory';
import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';
import { ServiceOrder } from 'src/service-orders/domain/entities/serviceOrder.entity';
@Injectable()
export class CreateServiceOrder {
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
    private serviceOrderFactory: ServiceOrderFactory,
  ) {}

  async run(request: ServiceOrderRequest): Promise<number> {
    // Mapping request from dto to entity
    const newServiceOrder = await this.serviceOrderFactory.createEntity(
      request,
    );

    if (this.isOrderAssigned(newServiceOrder)) {
      const execution = newServiceOrder.getValues().execution;
      if (execution) {
        execution.assignedTime = new Date();
      }
    }
    // Save entity
    return this.serviceOrderRepo.save(newServiceOrder);
  }

  private isOrderAssigned(newServiceOrder: ServiceOrder) {
    return (
      newServiceOrder.status === OrderStatus.PENDING &&
      newServiceOrder.getValues().execution?.executor
    );
  }
}
