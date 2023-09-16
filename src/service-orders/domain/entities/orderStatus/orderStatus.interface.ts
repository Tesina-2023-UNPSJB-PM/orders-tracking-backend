import { OrderStatus } from '../../enums/service-order-enums';

export interface OrderServiceStatus {
  getValue: () => OrderStatus;
  getNextStates: () => OrderStatus[];
  isValidStatusChange: (targetStatus: OrderStatus) => boolean;
  notifyStatusChange: () => void;
}
