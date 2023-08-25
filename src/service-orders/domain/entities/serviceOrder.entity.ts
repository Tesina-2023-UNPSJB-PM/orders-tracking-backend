import { Entity } from '../../../shared/domain/entities/entity';
import { OrderType } from './orderType.entity';
import { OrderPriority, OrderStatus } from '../enums/service-order-enums';
import { OrderLocation } from './orderLocation.entity';
import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';
import { OrderExecution } from './orderExecution.entity';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export interface ServiceOrderProps {
  number?: string;
  description?: string;
  type?: OrderType;
  status?: OrderStatus;
  priority?: OrderPriority;
  customerId?: number;
  customer?: Customer;
  destination?: OrderLocation;
  execution?: OrderExecution;
  creationTime?: Date;
  detail?: object;
}

export class ServiceOrder extends Entity<ServiceOrderProps> {
  private constructor(props: ServiceOrderProps, id?: number) {
    super(props, id);
  }

  get id(): number {
    return this._id;
  }

  getValues(): ServiceOrderProps {
    return this.props;
  }

  /**
   * Method to construct a valid service order entity
   * @param props
   * @param id
   * @returns ServiceOrder
   * @throws InvalidDomainException
   */
  public static create(props: ServiceOrderProps, id?: number): ServiceOrder {
    ServiceOrder.validateNumber(props);
    ServiceOrder.validateTypeOrder(props);
    ServiceOrder.validateStatus(props, id);
    ServiceOrder.validatePriority(props);
    ServiceOrder.validateAddressOfDestination(props);

    return new ServiceOrder(props, id);
  }

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
    if (!props.destination?.address) {
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

    if (
      (!id || id === 0) &&
      (values.status == OrderStatus.DONE ||
        values.status == OrderStatus.CANCELED)
    )
      throw new InvalidDomainException(
        'The status of the new order is incorrect',
      );

    if (!values.execution?.executor) {
      values.status = OrderStatus.UNASSIGNED;
    }
  }
}
