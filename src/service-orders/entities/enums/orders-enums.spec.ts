import {
  OrderEnumsUtils,
  OrderPriority,
  OrderStatus,
} from './service-order-enums';

describe('OrderEnumsUtils', () => {
  it('get an existing order status', () => {
    const status = OrderEnumsUtils.getOrderStatus('Created');

    expect(status).toEqual(OrderStatus.Created);
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
