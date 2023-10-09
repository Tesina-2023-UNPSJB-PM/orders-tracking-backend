import { Notification } from 'src/service-orders/infrastructure/client/pubnub.client';
import { OrderStatus } from '../../enums/service-order-enums';
import { ServiceOrder } from '../serviceOrder.entity';
import { OrderServiceStatus } from './orderStatus.interface';

export class CanceledStatus implements OrderServiceStatus {
  constructor(private context: ServiceOrder) {}

  getValue(): OrderStatus {
    return OrderStatus.CANCELED;
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

  getNotification(): Notification | undefined {
    return;
  }
}
