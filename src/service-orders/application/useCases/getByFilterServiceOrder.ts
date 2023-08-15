import { Inject, Injectable } from '@nestjs/common';
import {
  FindAllServiceOrderFilters,
  ServiceOrderRepository,
} from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';
import { MapperServiceOrder } from '../mappers/mapperServiceOrder';
import { PageOptionsDto } from 'src/shared/dto/pagination/page-options.dto';
import { PageDto } from 'src/shared/dto/pagination/page.dto';

@Injectable()
export class GetByFilterServiceOrder {
  private mapper: MapperServiceOrder;

  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {
    this.mapper = new MapperServiceOrder();
  }

  async run(
    filters: FindAllServiceOrderFilters,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ServiceOrderResponse>> {
    const result = await this.serviceOrderRepo.getByFilters(
      filters,
      pageOptionsDto,
    );
    const serviceOrders = result.data.map((order) =>
      this.mapper.mapToDto(order),
    );
    return new PageDto(serviceOrders, result.meta);
  }
}
