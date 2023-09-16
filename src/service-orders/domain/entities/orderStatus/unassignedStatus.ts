import { OrderStatus } from '../../enums/service-order-enums';
import { ServiceOrder } from '../serviceOrder.entity';
import { OrderServiceStatus } from './orderStatus.interface';

export class UnassignedStatus implements OrderServiceStatus {
  constructor(private context: ServiceOrder) {}

  getValue(): OrderStatus {
    return OrderStatus.UNASSIGNED;
  }
  getNextStates(): OrderStatus[] {
    return [OrderStatus.PENDING, OrderStatus.CANCELED];
  }

  isValidStatusChange(targetStatus: OrderStatus): boolean {
    return (
      this.getValue() === targetStatus ||
      this.getNextStates().includes(targetStatus)
    );
  }

  notifyStatusChange: () => void;
}
