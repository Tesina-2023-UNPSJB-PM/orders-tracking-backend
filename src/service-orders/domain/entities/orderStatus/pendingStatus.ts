import { PayloadNotification } from 'src/service-orders/infrastructure/client/pubnub.client';
import { OrderStatus } from '../../enums/service-order-enums';
import { ServiceOrder } from '../serviceOrder.entity';
import { OrderServiceStatus } from './orderStatus.interface';

export class PendingStatus implements OrderServiceStatus {
  constructor(private context: ServiceOrder) {}

  getValue(): OrderStatus {
    return OrderStatus.PENDING;
  }
  getNextStates(): OrderStatus[] {
    return [OrderStatus.UNASSIGNED, OrderStatus.DONE, OrderStatus.CANCELED];
  }

  isValidStatusChange(targetStatus: OrderStatus): boolean {
    return (
      this.getValue() === targetStatus ||
      this.getNextStates().includes(targetStatus)
    );
  }

  getPayloadNotification(): PayloadNotification {
    const executor = this.context.getValues().execution?.executor;
    const fullNameEmployee = `${executor?.firstName} ${executor?.lastName}`;
    return {
      title: 'Orden asignada',
      body: `Orden ${
        this.context.getValues().number
      } asignada a ${fullNameEmployee}`,
    };
  }
}
