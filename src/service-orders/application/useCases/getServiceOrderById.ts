import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { MapperServiceOrder } from '../mappers/mapperServiceOrder';
import { ServiceOrderResponseDTO } from 'src/service-orders/dto/serviceOrderRes.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

@Injectable()
export class GetServiceOrderById {
  private mapper: MapperServiceOrder;
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {}

  async run(id?: number): Promise<ServiceOrderResponseDTO | null> {
    const result = await this.serviceOrderRepo.getById(id);
    return result ? this.mapper.mapToDto(result) : null;
  }
}
