import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';

@Injectable()
export class DeleteServiceOrder {
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
  ) {}

  async run(id: number): Promise<void> {
    this.serviceOrderRepo.delete(id);
  }
}
