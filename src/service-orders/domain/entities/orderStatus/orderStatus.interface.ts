import { PayloadNotification } from 'src/service-orders/infrastructure/client/pubnub.client';
import { OrderStatus } from '../../enums/service-order-enums';

export interface OrderServiceStatus {
  getValue: () => OrderStatus;
  getNextStates: () => OrderStatus[];
  isValidStatusChange: (targetStatus: OrderStatus) => boolean;
  getPayloadNotification: () => PayloadNotification | undefined;
}
