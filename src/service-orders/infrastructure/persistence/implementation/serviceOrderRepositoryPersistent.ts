import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceOrder } from '../../../domain/entities/serviceOrder.entity';
import { ServiceOrderRepository } from '../../../domain/repositories/serviceOrderRepository';
import { ServiceOrderPersistent } from '../entities/serviceOrderPersistent';

@Injectable()
export class ServiceOrderRepositoryPersistence
  implements ServiceOrderRepository
{
  constructor(
    @InjectRepository(ServiceOrderPersistent)
    private repository: Repository<ServiceOrderPersistent>,
  ) {}

  async getAll(): Promise<ServiceOrder[]> {
    return (await this.repository.find()).map((row) =>
      this.mapToServiceOrder(row),
    );
  }

  async getById(id: number): Promise<ServiceOrder | null> {
    const resultDB = await this.repository.findOneBy({ id });

    return resultDB ? this.mapToServiceOrder(resultDB) : null;
  }

  async getByServiceOrderNumber(number: string): Promise<ServiceOrder | null> {
    const resultDB = await this.repository.findOneBy({ number });

    return resultDB ? this.mapToServiceOrder(resultDB) : null;
  }

  save: (entity: ServiceOrder) => Promise<ServiceOrder>;

  update(customer: ServiceOrder): Promise<ServiceOrder> {
    return this.save(customer);
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private mapToServiceOrder(row: ServiceOrderPersistent): ServiceOrder {
    return ServiceOrder.create({}, row.id);
  }
}
