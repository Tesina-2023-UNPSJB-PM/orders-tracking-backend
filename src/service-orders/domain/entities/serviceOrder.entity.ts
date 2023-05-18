import { Entity } from '../../../shared/domain/entities/entity';
import { OrderType } from '../valueObjects/order-type.entity';
import { OrderPriority, OrderStatus } from '../enums/service-order-enums';
import { OrderLocation } from './order-location.entity';
import { Sector } from './sector.entity';
import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';
import { Employee } from './employee.entity';

export interface ServiceOrderProps {
  number: string;
  description: string;
  observations?: string;
  type?: OrderType;
  status?: OrderStatus;
  priority?: OrderPriority;
  executor?: Employee;
  assignedSector?: Sector;
  customerId: number;
  destination: OrderLocation;
  creationTime: Date;
  assignedTime: Date;
  estimatedResolutionTime: Date;
  resolutionTime: Date;
  detail: object;
}

export class ServiceOrder extends Entity<ServiceOrderProps> {
  private constructor(props: ServiceOrderProps, id?: number) {
    super(props, id);
  }

  getValues(): ServiceOrderProps {
    return this.props;
  }

  public static create(props: ServiceOrderProps, id?: number): ServiceOrder {
    ServiceOrder.validateStatus(props, id);

    ServiceOrder.validateNumber(props);

    ServiceOrder.validateAddressOfDestination(props);

    ServiceOrder.validateTypeOrder(props);

    ServiceOrder.validatePriority(props);

    ServiceOrder.validateSector(props);

    ServiceOrder.validateCustomer(props);

    return new ServiceOrder(props, id);
  }

  private static validateCustomer(props: ServiceOrderProps) {
    if (!props.customer) {
      throw new InvalidDomainException('The order has no customer assigned');
    }
  }

  private static validateSector(props: ServiceOrderProps) {
    if (!props.assignedSector) {
      throw new InvalidDomainException(
        'the order has not been assigned to any sector',
      );
    }
  }

  /*private static validateExecutor(props: ServiceOrderProps) {
    if (!props.executor) {
      throw new InvalidDomainException('Unassigned executor of the order');
    }
  }*/

  private static validatePriority(props: ServiceOrderProps) {
    if (!props.priority) {
      throw new InvalidDomainException('Order priority undefined');
    }
  }

  private static validateTypeOrder(props: ServiceOrderProps) {
    if (!props.type) {
      throw new InvalidDomainException('Order type undefined');
    }
  }

  private static validateAddressOfDestination(props: ServiceOrderProps) {
    if (!props.destination.address) {
      throw new InvalidDomainException(
        'Destination of service order undefined',
      );
    }
  }

  private static validateNumber(values: ServiceOrderProps) {
    if (!values.number)
      throw new InvalidDomainException('Number of service order undefined');
  }

  private static validateStatus(values: ServiceOrderProps, id?: number) {
    if (!values.status) {
      throw new InvalidDomainException('Order status undefined');
    }

    if ((!id || id === 0) && values.status !== OrderStatus.PENDING)
      throw new InvalidDomainException(
        'The status of the new order is incorrect',
      );
  }
}
