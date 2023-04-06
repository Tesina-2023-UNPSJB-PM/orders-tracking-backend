import {
  OrderEnumsUtils,
  OrderPriority,
  OrderStatus,
} from '../../src/service-orders/domain/enums/service-order-enums';

describe('OrderEnumsUtils', () => {
  it('get an existing order status', () => {
    const status = OrderEnumsUtils.getOrderStatus('Pending');

    expect(status).toEqual(OrderStatus.Pending);
  });

  it('get undefined if the state of an order does not exist', () => {
    const statusOrder = OrderEnumsUtils.getOrderStatus('StatusInexists');

    expect(statusOrder).toBeUndefined();
  });

  it('get an existing order priority', () => {
    const priorityOrder = OrderEnumsUtils.getOrderPriority('Low');

    expect(priorityOrder).toEqual(OrderPriority.Low);
  });

  it('get undefined if the priority of an order does not exist', () => {
    const priorityOrder = OrderEnumsUtils.getOrderPriority('PriorityInexists');

    expect(priorityOrder).toBeUndefined();
  });
});
