import {
  OrderEnumsUtils,
  OrderPriority,
} from '../domain/enums/service-order-enums';
import { OrderStatus } from '../domain/enums/service-order-enums';
import { OrderLocation } from '../domain/order-location.entity';
import { ServiceDetail } from '../domain/service-order.entity';
import { ServiceOrder } from '../domain/service-order.entity';

export class CreateServiceOrderDto {
  number: string;
  description: string;
  observations: string;
  typeId: number;
  priority: OrderPriority;
  assignedUserId: number;
  destination: OrderLocation;
  estimatedResolutionTime: Date;
  customerId: number;
  serviceDetail: ServiceDetail;

  public static mapToServiceOrder(from: CreateServiceOrderDto): ServiceOrder {
    const result = new ServiceOrder();
    result.number = from.number;
    result.description = from.description;
    result.observations = from.observations;
    result.status = OrderStatus.Pending;
    result.priority = OrderEnumsUtils.getOrderPriority(from.priority);
    result.destination = from.destination;
    result.creationTime = new Date();
    result.estimatedResolutionTime = from.estimatedResolutionTime;
    result.serviceDetail = from.serviceDetail;

    return result;
  }
}
