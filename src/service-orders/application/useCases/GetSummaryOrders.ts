import { Inject, Injectable } from '@nestjs/common';
import {
  OrderEnumsUtils,
  OrderPriority,
  OrderStatus,
} from 'src/service-orders/domain/enums/service-order-enums';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';
import { SummaryOrdersDTO } from 'src/service-orders/dto/summaryOrdersRes.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { MapperServiceOrder } from '../mappers/mapperServiceOrder';
import { Order } from 'src/shared/dto/pagination/constants/order.constant';

@Injectable()
export class GetSummaryOrders {
  private _employeeId: number;

  private mapper: MapperServiceOrder;

  public get employeeId(): number {
    return this._employeeId;
  }

  public set employeeId(value: number) {
    this._employeeId = value;
  }

  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {
    this.mapper = new MapperServiceOrder();
  }

  async run(): Promise<SummaryOrdersDTO> {
    if (!this.employeeId)
      throw new InvalidDomainException('Employee id not specified');

    // Get orders assigned
    const assignedOrders = await this.getAssignedOrders(this._employeeId);
    // Get recent activity
    const recentActivityEmployee = await this.getRecenActivityEmployee(
      this._employeeId,
    );
    const result = new SummaryOrdersDTO();
    result.assignedServiceOrders = assignedOrders;
    result.recentActivity = recentActivityEmployee;

    return result;
  }

  private async getAssignedOrders(
    employeeId: number,
  ): Promise<ServiceOrderResponse[]> {
    return (await this.getOrdersByStatus(employeeId, OrderStatus.PENDING)).sort(
      (previous, current) =>
        this.getPriorityWeight(current.priority) -
        this.getPriorityWeight(previous.priority),
    );
  }

  private getPriorityWeight(value?: string): number {
    const priority = value
      ? OrderEnumsUtils.getOrderPriority(value)
      : OrderPriority.LOW;

    switch (priority) {
      case OrderPriority.LOW:
        return 10;
      case OrderPriority.MEDIUM:
        return 20;
      case OrderPriority.HIGH:
        return 30;
    }
  }

  private async getRecenActivityEmployee(
    employeeId: number,
  ): Promise<ServiceOrderResponse[]> {
    const doneOrders = await this.getOrdersByStatus(
      employeeId,
      OrderStatus.DONE,
      Order.DESC,
    );

    const canceledOrders = await this.getOrdersByStatus(
      employeeId,
      OrderStatus.CANCELED,
      Order.DESC,
    );

    return doneOrders.concat(canceledOrders);
  }

  private async getOrdersByStatus(
    employeeId: number,
    status: OrderStatus,
    order?: Order,
  ) {
    const result = await this.serviceOrderRepo.getByFilters(
      {
        statusCode: status,
        employeeId: employeeId,
      },
      {
        page: 0,
        skip: 0,
        order: order ?? Order.ASC,
      },
    );

    return result.data.map((order) => this.mapper.mapToDto(order));
  }
}
