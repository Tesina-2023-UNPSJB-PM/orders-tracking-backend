import { ServiceOrder } from '../domain/service-order.entity';
import { CreateServiceOrderDto } from './create-service-order.dto';
import { OrderEnumsUtils } from '../domain/enums/service-order-enums';

export class UpdateServiceOrderDto extends CreateServiceOrderDto {
  id: number;
  status: string;

  public static mapToServiceOrder(from: UpdateServiceOrderDto): ServiceOrder {
    const result = new ServiceOrder();
    result.id = from.id;
    result.number = from.number;
    result.description = from.description;
    result.observations = from.observations;
    result.status = OrderEnumsUtils.getOrderStatus(from.status);
    result.priority = OrderEnumsUtils.getOrderPriority(from.priority);
    result.destination = from.destination;
    result.creationTime = new Date();
    result.estimatedResolutionTime = from.estimatedResolutionTime;
    result.serviceDetail = from.serviceDetail;

    return result;
  }
}
