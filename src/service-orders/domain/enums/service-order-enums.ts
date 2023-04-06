export enum OrderPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export enum OrderStatus {
  Done = 'DONE',
  Canceled = 'CANCELED',
  Pending = 'PENDING',
}

export class OrderEnumsUtils {
  public static getOrderStatus(key: string): OrderStatus {
    return OrderStatus[key as keyof typeof OrderStatus];
  }

  public static getOrderPriority(key: string): OrderPriority {
    return OrderPriority[key as keyof typeof OrderPriority];
  }
}
