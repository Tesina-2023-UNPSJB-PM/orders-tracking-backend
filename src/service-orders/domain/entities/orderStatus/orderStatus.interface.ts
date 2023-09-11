import { OrderStatus } from '../../enums/service-order-enums';

export interface OrderServiceStatus {
  getValue: () => OrderStatus;
  getNextStates: () => OrderStatus[];
  notifyStatusChange: () => void;
}
