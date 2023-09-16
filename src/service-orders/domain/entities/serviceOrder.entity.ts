import { Entity } from '../../../shared/domain/entities/entity';
import { OrderType } from './orderType.entity';
import { OrderPriority, OrderStatus } from '../enums/service-order-enums';
import { OrderLocation } from './orderLocation.entity';
import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';
import { OrderExecution } from './orderExecution.entity';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { OrderServiceStatus } from './orderStatus/orderStatus.interface';
import { StatusFactory } from './orderStatus/statusFactory';

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
  private orderStatus: OrderServiceStatus;

  private constructor(
    props: ServiceOrderProps,
    id?: number,
    currentStatus?: OrderStatus,
  ) {
    super(props, id);
    if (!currentStatus)
      throw new InvalidDomainException(`Undefined order status`);
    this.orderStatus = StatusFactory.createOrderStatus(currentStatus, this);
  }

  get id(): number {
    return this._id;
  }

  get status(): OrderStatus {
    return this.orderStatus.getValue();
  }

  getValues(): ServiceOrderProps {
    return this.props;
  }

  changeStatus(newStatus: OrderStatus): void {
    if (!this.orderStatus)
      throw new InvalidDomainException(`Undefined order status`);

    const isStatusValid = this.orderStatus.isValidStatusChange(newStatus);

    if (!isStatusValid) throw new InvalidDomainException(`New invalid status`);

    this.orderStatus = StatusFactory.createOrderStatus(newStatus, this);
    this.getValues().status = newStatus;
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

    return new ServiceOrder(props, id, props.status);
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

    if (
      values.status !== OrderStatus.UNASSIGNED &&
      !values.execution?.executor.id
    ) {
      throw new InvalidDomainException(
        `The order is in status ${values.status} but does not have an assigned employee`,
      );
    }
  }
}
