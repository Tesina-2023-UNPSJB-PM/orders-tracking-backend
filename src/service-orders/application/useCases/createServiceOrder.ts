import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderRequest } from 'src/service-orders/dto/serviceOrderReq.dto';
import { ServiceOrderFactory } from '../factories/serviceOrderFactory';
@Injectable()
export class CreateServiceOrder {
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
    private serviceOrderFactory: ServiceOrderFactory,
  ) {}

  async run(request: ServiceOrderRequest): Promise<number> {
    // Mapping request from dto to entity
    const newServiceOrder = await this.serviceOrderFactory.createEntity(
      request,
    );
    // Save entity
    return this.serviceOrderRepo.save(newServiceOrder);
  }
}
