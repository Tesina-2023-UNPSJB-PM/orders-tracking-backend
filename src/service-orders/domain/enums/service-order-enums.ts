import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

export enum OrderPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum OrderStatus {
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
}

export class OrderEnumsUtils {
  public static getOrderStatus(key: string): OrderStatus {
    const status = OrderStatus[key as keyof typeof OrderStatus];
    if (!status) {
      throw new InvalidDomainException(`Status ${key} invalid`);
    }
    return status;
  }

  public static getOrderPriority(key: string): OrderPriority {
    const priority = OrderPriority[key as keyof typeof OrderPriority];
    if (!priority) {
      throw new InvalidDomainException(`Priority ${key} invalid`);
    }
    return priority;
  }
}
