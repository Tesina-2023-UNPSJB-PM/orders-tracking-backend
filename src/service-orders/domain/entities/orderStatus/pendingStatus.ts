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

  notifyStatusChange: () => void;
}
