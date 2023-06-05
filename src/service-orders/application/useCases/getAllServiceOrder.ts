import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';
import { MapperServiceOrder } from '../mappers/mapperServiceOrder';

@Injectable()
export class GetAllServiceOrder {
  private mapper: MapperServiceOrder;

  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {
    this.mapper = new MapperServiceOrder();
  }

  async run(): Promise<ServiceOrderResponse[]> {
    const result = await this.serviceOrderRepo.getAll();

    return result.map((order) => this.mapper.mapToDto(order));
  }
}
