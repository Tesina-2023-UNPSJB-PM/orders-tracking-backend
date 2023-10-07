import {
  GLOBAL_CHANNEL,
  Notification,
} from 'src/service-orders/infrastructure/client/pubnub.client';
import { OrderStatus } from '../../enums/service-order-enums';
import { ServiceOrder } from '../serviceOrder.entity';
import { OrderServiceStatus } from './orderStatus.interface';

export class DoneStatus implements OrderServiceStatus {
  constructor(private context: ServiceOrder) {}

  getValue(): OrderStatus {
    return OrderStatus.DONE;
  }
  getNextStates(): OrderStatus[] {
    return [];
  }

  isValidStatusChange(targetStatus: OrderStatus): boolean {
    return (
      this.getValue() === targetStatus ||
      this.getNextStates().includes(targetStatus)
    );
  }

  getNotification(): Notification {
    return {
      channel: GLOBAL_CHANNEL,
      payload: {
        title: 'Orden finalizada',
        body: `La orden ${this.context.getValues().number} a sido finalizada`,
      },
    };
  }
}
