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

    const isOrderAssigned =
      newServiceOrder.status === OrderStatus.PENDING &&
      newServiceOrder.getValues().execution?.executor;

    if (isOrderAssigned) {
      const execution = newServiceOrder.getValues().execution;
      if (execution) {
        execution.assignedTime = new Date();
      }
    }
    // Save entity
    return this.serviceOrderRepo.save(newServiceOrder).then((id) => {
      if (isOrderAssigned) {
        this.notifyAssignedOrder(newServiceOrder);
      }

      return id;
    });
  }

  private notifyAssignedOrder(serviceOrder: ServiceOrder) {
    const payloadNotification = serviceOrder.getPayloadNotification();
    if (payloadNotification) {
      this.notifier.sendNotification(payloadNotification);
    }
  }
}
