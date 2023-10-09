import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderRequest } from 'src/service-orders/dto/serviceOrderReq.dto';
import { ServiceOrderFactory } from '../factories/serviceOrderFactory';
import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';
import { ServiceOrder } from 'src/service-orders/domain/entities/serviceOrder.entity';
import { PubNubClient } from 'src/service-orders/infrastructure/client/pubnub.client';
@Injectable()
export class CreateServiceOrder {
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
    private serviceOrderFactory: ServiceOrderFactory,
    private notifier: PubNubClient,
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
    const id = await this.serviceOrderRepo.save(newServiceOrder);

    this.notifyNewOrder(id);

    return id;
  }

  private isOrderAssigned(newServiceOrder: ServiceOrder) {
    return (
      newServiceOrder.status === OrderStatus.PENDING &&
      newServiceOrder.getValues().execution?.executor
    );
  }

  private notifyNewOrder(id: number) {
    this.serviceOrderRepo.getById(id).then((result) => {
      if (!result) {
        return;
      }
      const notification = result.getNotification();

      if (notification) {
        this.notifier.sendNotification(notification);
      }
    });
  }
}
