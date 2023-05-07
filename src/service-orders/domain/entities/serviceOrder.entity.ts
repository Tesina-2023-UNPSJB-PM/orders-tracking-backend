import { Entity } from '../../../shared/domain/entities/entity';
import { OrderType } from '../order-type.entity';
import { OrderPriority, OrderStatus } from '../enums/service-order-enums';
import { Customer } from '../../../customers/domain/entities/customer.entity';
import { OrderLocation } from '../order-location.entity';
import { Sector } from '../valueObjects/sector.vo';
import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';

interface ServiceOrderProps {
  number: string;
  description: string;
  observations: string;
  type: OrderType;
  status: OrderStatus;
  priority: OrderPriority;
  assignedWorker: Worker;
  assignedSector: Sector;
  target: Customer;
  destination: OrderLocation;
  creationTime: Date;
  assignedTime: Date;
  estimatedResolutionTime: Date;
  resolutionTime: Date;
  detail: any;
}

export class ServiceOrder extends Entity<ServiceOrderProps> {
  private constructor(props: ServiceOrderProps, id?: number) {
    super(props, id);
  }

  getValues(): ServiceOrderProps {
    return this.props;
  }

  public static createServiceOrder(
    values: ServiceOrderProps,
    id?: number,
  ): ServiceOrder {
    ServiceOrder.validateStatusNewServiceOrder(values, id);

    ServiceOrder.validateNumber(values);

    return new ServiceOrder(values, id);
  }

  private static validateNumber(values: ServiceOrderProps) {
    if (!values.number)
      throw new InvalidDomainException('Number of service order undefined');
  }

  private static validateStatusNewServiceOrder(
    values: ServiceOrderProps,
    id?: number,
  ) {
    if ((!id || id === 0) && values.status !== OrderStatus.Pending)
      throw new InvalidDomainException(
        'The status of the new order is incorrect',
      );
  }
}
