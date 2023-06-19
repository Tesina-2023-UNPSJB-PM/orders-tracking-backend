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
import { OrderExecutionPersistent } from '../entities/orderExecutionPersistent';
import { AddressPersistent } from 'src/shared/infrastructure/entitiesDB/addressPersistent';
import { OrderLocationPersistent } from '../entities/orderLocationPersistent';

@Injectable()
export class ServiceOrderRepositoryPersistence
  implements ServiceOrderRepository
{
  private mapperServiceOrder: MapperServiceOrderPersistent;
  constructor(
    @InjectRepository(ServiceOrderPersistent)
    private repository: Repository<ServiceOrderPersistent>,
    @InjectRepository(OrderExecutionPersistent)
    private executionRepository: Repository<OrderExecutionPersistent>,
    @InjectRepository(AddressPersistent)
    private addressRepository: Repository<AddressPersistent>,
    @InjectRepository(OrderLocationPersistent)
    private locationRepository: Repository<OrderLocationPersistent>,
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
    await this.repository.queryRunner?.startTransaction();
    try {
      const orderSaved = await this.saveEntity(entity);
      await this.repository.queryRunner?.commitTransaction;

      return this.mapperServiceOrder.mapToServiceOrder(orderSaved);
    } catch (err) {
      await this.repository.queryRunner?.rollbackTransaction();
      throw err;
    }
  }

  private async saveEntity(entity: ServiceOrder) {
    const orderPersistent =
      this.mapperServiceOrder.mapToServiceOrderPersistent(entity);

    if (orderPersistent.execution) {
      await this.executionRepository.save(orderPersistent.execution);
    }

    const destination = orderPersistent.destination;
    if (destination) {
      if (destination.address && destination.address.id === 0) {
        await this.addressRepository.save(destination.address);
      }

      await this.locationRepository.save(destination);
    }

    return await this.repository.save(orderPersistent);
  }

  async update(entity: ServiceOrder): Promise<void> {
    await this.repository.queryRunner?.startTransaction();

    try {

      await this.updateEntity(entity);
      await this.repository.queryRunner?.commitTransaction();

    } catch (error) {
      await this.repository.queryRunner?.rollbackTransaction();
      throw new TypeORMError(error.message);
    }
  }

  private async updateEntity(entity: ServiceOrder): Promise<void> {
    const orderPersistent =
      this.mapperServiceOrder.mapToServiceOrderPersistent(entity);

    await this.repository.update(entity.id, {
      description: orderPersistent.description,
      priority: orderPersistent.priority,
      status: orderPersistent.status,
      type: orderPersistent.type,
      customerId: orderPersistent.customerId,
      detail: orderPersistent.detail,
    });

    const execution = orderPersistent.execution;
    if (execution && execution.id) {
      await this.executionRepository.update(execution.id, execution);
    }

    const destination = orderPersistent.destination;
    if (destination && destination.id) {
      await this.locationRepository.update(destination.id, destination);
    }
  }

  async delete(id: number): Promise<void> {
    const orderPersistent = await this.repository.findOneBy({ id });
    if (orderPersistent) {
      orderPersistent.removed = true;
      this.repository.save(orderPersistent);
    }
  }
}
