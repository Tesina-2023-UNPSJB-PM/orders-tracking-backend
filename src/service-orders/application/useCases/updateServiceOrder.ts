import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderFactory } from '../factories/serviceOrderFactory';
import { ServiceOrderRequest } from 'src/service-orders/dto/serviceOrderReq.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

@Injectable()
export class UpdateServiceOrder {
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
    private serviceOrderFactory: ServiceOrderFactory,
  ) {}

  async run(request: ServiceOrderRequest): Promise<void> {
    const serviceOrder = await this.serviceOrderRepo.getById(request.id);
    if (!serviceOrder) {
      throw new InvalidDomainException(
        `There is no service order with id ${request.id}`,
      );
    }

    // Mapping request from dto to entity
    const entityToUpdate = await this.serviceOrderFactory.createEntity(request);

    this.serviceOrderRepo.update(entityToUpdate);
  }
}
