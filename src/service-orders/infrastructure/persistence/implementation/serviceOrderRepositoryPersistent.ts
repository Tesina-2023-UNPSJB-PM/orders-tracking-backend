import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { ServiceOrder } from '../../../domain/entities/serviceOrder.entity';
import {
  FindAllServiceOrderFilters,
  ServiceOrderRepository,
} from '../../../domain/repositories/serviceOrderRepository';
import { ServiceOrderPersistent } from '../entities/serviceOrderPersistent';
import { MapperServiceOrderPersistent } from '../mappers/mapperServiceOrderPersistent';
import { getDateInterval } from 'src/shared/infrastructure/utils/date.utils';

@Injectable()
export class ServiceOrderRepositoryPersistence
  implements ServiceOrderRepository
{
  private mapperServiceOrder: MapperServiceOrderPersistent;
  constructor(
    @InjectRepository(ServiceOrderPersistent)
    private repository: Repository<ServiceOrderPersistent>,
  ) {
    this.mapperServiceOrder = new MapperServiceOrderPersistent();
  }

  async getAll(): Promise<ServiceOrder[]> {
    return (await this.repository.find()).map((row) =>
      this.mapperServiceOrder.mapToServiceOrder(row),
    );
  }

  async getById(id: number): Promise<ServiceOrder | null> {
    const resultDB = await this.repository.findOneBy({ id });

    return resultDB
      ? this.mapperServiceOrder.mapToServiceOrder(resultDB)
      : null;
  }

  async getByServiceOrderNumber(number: string): Promise<ServiceOrder | null> {
    const resultDB = await this.repository.findOneBy({ number });

    return resultDB
      ? this.mapperServiceOrder.mapToServiceOrder(resultDB)
      : null;
  }

  async getByFilters({
    customerId,
    employeeId,
    statusCode,
    creationDate,
  }: FindAllServiceOrderFilters): Promise<ServiceOrder[]> {
    const { fromDate, toDate } = getDateInterval(creationDate);
    

    return (
      await this.repository.find({
        where: {
          customerId,
          execution: { executor: { id: employeeId } },
          status: statusCode,
          creationTime: Between(fromDate, toDate),
        },
      })
    ).map((row) => this.mapperServiceOrder.mapToServiceOrder(row));
  }

  save: (entity: ServiceOrder) => Promise<ServiceOrder>;

  update(customer: ServiceOrder): Promise<ServiceOrder> {
    return this.save(customer);
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
