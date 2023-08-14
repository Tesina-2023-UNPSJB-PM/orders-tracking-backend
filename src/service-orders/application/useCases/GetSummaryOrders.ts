import { Inject, Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';
import { SummaryOrdersDTO } from 'src/service-orders/dto/summaryOrdersRes.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

@Injectable()
export class GetSummaryOrders {
  private _employeeId: number;

  public get employeeId(): number {
    return this._employeeId;
  }

  public set employeeId(value: number) {
    this._employeeId = value;
  }

  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {}

  async run(): Promise<SummaryOrdersDTO> {
    if (!this.employeeId)
      throw new InvalidDomainException('Employee id not specified');

    // Get orders assigned
    const assignedOrders = await this.getAssignedOrders(this._employeeId);
    // Get recent activity
    const recentActivityEmployee = this.getRecenActivityEmployee(
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
    const result = await this.serviceOrderRepo.getByFilters(
      {
        statusCode: OrderStatus.PENDING,
        employeeId: employeeId,
      },
      {
        page: 0,
        skip: 0,
      },
    );

    return result.data;
  }

  private getRecenActivityEmployee(employeeId: number): ServiceOrderResponse[] {
    throw new Error('Method not implemented.');
  }
}
