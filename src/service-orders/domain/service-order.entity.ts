import { Customer } from '../../customers/domain/entities/customer.entity';
import { OrderPriority } from './enums/service-order-enums';
import { OrderStatus } from './enums/service-order-enums';
import { OrderLocation } from './order-location.entity';
import { OrderType } from './order-type.entity';
import { User } from '../../users/domain/user.entity';

export type ServiceDetail = any;

export class ServiceOrder {
  id: number;
  number: string;
  description: string;
  observations: string;
  type: OrderType;
  status: OrderStatus;
  priority: OrderPriority;
  assignedUser: User | undefined | null;
  destination: OrderLocation;
  creationTime: Date;
  assignedTime: Date | undefined | null;
  estimatedResolutionTime: Date;
  resolutionTime: Date | undefined | null;
  customer: Customer | undefined | null;
  serviceDetail: ServiceDetail;
}
