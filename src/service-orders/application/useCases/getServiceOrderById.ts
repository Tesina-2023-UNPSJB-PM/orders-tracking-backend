import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { MapperServiceOrder } from '../mappers/mapperServiceOrder';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';

@Injectable()
export class GetServiceOrderById {
  private mapper: MapperServiceOrder;
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {
    this.mapper = new MapperServiceOrder();
  }

  async run(id?: number): Promise<ServiceOrderResponse | null> {
    const result = await this.serviceOrderRepo.getById(id);
    return result ? this.mapper.mapToDto(result) : null;
  }
}
