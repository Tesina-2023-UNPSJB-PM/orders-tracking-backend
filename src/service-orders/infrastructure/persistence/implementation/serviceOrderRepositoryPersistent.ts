import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, TypeORMError } from 'typeorm';

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
    return (await this.repository.find({ where: { removed: false } })).map(
      (row) => this.mapperServiceOrder.mapToServiceOrder(row),
    );
  }

  async getById(id: number): Promise<ServiceOrder | null> {
    const resultDB = await this.repository.findOneBy({ id, removed: false });

    return resultDB
      ? this.mapperServiceOrder.mapToServiceOrder(resultDB)
      : null;
  }

  async getByServiceOrderNumber(number: string): Promise<ServiceOrder | null> {
    const resultDB = await this.repository.findOneBy({
      number,
      removed: false,
    });

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
          removed: false,
        },
      })
    ).map((row) => this.mapperServiceOrder.mapToServiceOrder(row));
  }

  async save(entity: ServiceOrder): Promise<ServiceOrder> {
    const orderPersistent =
      this.mapperServiceOrder.mapToServiceOrderPersistent(entity);
    const orderSaved = await this.repository.save(orderPersistent);

    return this.mapperServiceOrder.mapToServiceOrder(orderSaved);
  }

  async update(entity: ServiceOrder): Promise<ServiceOrder> {
    const orderPersistent = await this.repository.findOneBy({
      id: entity.id,
      removed: false,
    });
    if (!orderPersistent) {
      throw new TypeORMError(
        `Service order with id ${entity.id} does not exist`,
      );
    }

    return this.save(entity);
  }

  async delete(id: number): Promise<void> {
    const orderPersistent = await this.repository.findOneBy({ id });
    if (orderPersistent) {
      orderPersistent.removed = true;
      this.repository.save(orderPersistent);
    }
  }
}
