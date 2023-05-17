export enum OrderPriority {
  LOW,
  MEDIUM,
  HIGH,
}

export enum OrderStatus {
  DONE,
  CANCELED,
  PENDING,
}

export class OrderEnumsUtils {
  public static getOrderStatus(key: string): OrderStatus {
    return OrderStatus[key as keyof typeof OrderStatus];
  }

  public static getOrderPriority(key: string): OrderPriority {
    return OrderPriority[key as keyof typeof OrderPriority];
  }
}
