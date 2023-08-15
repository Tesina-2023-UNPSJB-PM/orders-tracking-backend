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

export const OrderStates = [
  {
    code: OrderStatus.DONE,
    name: 'Finalizado',
    description: 'La orden de servicio fue finalizada correctamente.'
  },
  {
    code: OrderStatus.CANCELED,
    name: 'Cancelada',
    description: 'La orden de servicio fue cancelada.',
  },
  {
    code: OrderStatus.PENDING,
    name: 'Pendiente',
    description: 'La orden de servicio se encuentra en ejecución.',
  }
]
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
