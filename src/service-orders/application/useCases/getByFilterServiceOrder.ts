import { Inject, Injectable } from '@nestjs/common';
import { FindAllServiceOrderFilters, ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';
import { MapperServiceOrder } from '../mappers/mapperServiceOrder';

@Injectable()
export class GetByFilterServiceOrder {
  private mapper: MapperServiceOrder;

  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {
    this.mapper = new MapperServiceOrder();
  }

  async run(filters: FindAllServiceOrderFilters): Promise<ServiceOrderResponse[]> {
    const result = await this.serviceOrderRepo.getByFilters(filters);

    return result.map((order) => this.mapper.mapToDto(order));
  }
}
