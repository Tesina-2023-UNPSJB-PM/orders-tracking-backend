import { OrderStatus } from '../../enums/service-order-enums';
import { ServiceOrder } from '../serviceOrder.entity';
import { CanceledStatus } from './canceledStatus';
import { DoneStatus } from './doneStatus';
import { OrderServiceStatus } from './orderStatus.interface';
import { PendingStatus } from './pendingStatus';
import { UnassignedStatus } from './unassignedStatus';

export class StatusFactory {
  public static createOrderStatus(
    status: OrderStatus,
    context: ServiceOrder,
  ): OrderServiceStatus {
    switch (status) {
      case OrderStatus.UNASSIGNED:
        return new UnassignedStatus(context);
      case OrderStatus.PENDING:
        return new PendingStatus(context);
      case OrderStatus.DONE:
        return new DoneStatus(context);
      case OrderStatus.CANCELED:
        return new CanceledStatus(context);
    }
  }
}
