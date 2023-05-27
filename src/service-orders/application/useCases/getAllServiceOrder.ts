import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderResponseDTO } from 'src/service-orders/dto/serviceOrderRes.dto';
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

  async run(): Promise<ServiceOrderResponseDTO[]> {
    const result = await this.serviceOrderRepo.getAll();

    return result.map((order) => this.mapper.mapToDto(order));
  }
}
