import { ExecutionHistoryRepository } from 'src/service-orders/domain/repositories/executionHistoryRepository';
import { ExecutionHistoryPersistent } from '../entities/executionHistoryPersistent';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReasonStatusPersistent } from '../entities/reasonStatusPersistent';
import { ServiceOrderPersistent } from '../entities/serviceOrderPersistent';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { MapperServiceOrderPersistent } from '../mappers/mapperServiceOrderPersistent';

@Injectable()
export class ExecutionHistoryRepositoryPersistent
  implements ExecutionHistoryRepository
{
  private mapperServiceOrder: MapperServiceOrderPersistent;
  
  constructor(
    @InjectRepository(ExecutionHistoryPersistent)
    private repository: Repository<ExecutionHistoryPersistent>,
    @InjectRepository(ReasonStatusPersistent)
    private repositoryReason: Repository<ReasonStatusPersistent>,
    @InjectRepository(ServiceOrderPersistent)
    private repoServiceOrder: Repository<ServiceOrderPersistent>,
  ) {
    this.mapperServiceOrder = new MapperServiceOrderPersistent();
  }

  getAll(): Promise<ExecutionHistoryPersistent[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<ExecutionHistoryPersistent | null> {
    return this.repository.findOneBy({ id });
  }

  getHistoryOfExecution(
    executionId: number,
  ): Promise<ExecutionHistoryPersistent[]> {
    return this.repository.findBy({ execution: { id: executionId } });
  }

  async save(entity: ExecutionHistoryPersistent): Promise<number> {
    let orderPersistent = await this.repoServiceOrder.findOneBy({
      execution: { id: entity.execution.id },
    });

    if (!orderPersistent)
      throw new InvalidDomainException(
        `The execution service order with id ${entity.execution.id} was not found`,
      );

    const orderEntity =
      this.mapperServiceOrder.mapToServiceOrder(orderPersistent);

    await this.repository.queryRunner?.startTransaction();

    if (orderEntity.status != entity.status) {
      orderEntity.changeStatus(entity.status);
      orderPersistent =
        this.mapperServiceOrder.mapToServiceOrderPersistent(orderEntity);
      this.repoServiceOrder.save(orderPersistent);
    }

    const entitySaved = await this.repository.save(entity);

    await this.repository.queryRunner?.commitTransaction();

    return entitySaved.id ?? -1;
  }

  async update(entity: ExecutionHistoryPersistent): Promise<void> {
    if (!entity.id) return;

    this.repository.update(entity.id, entity);
  }

  async delete(id: number): Promise<void> {
    this.repository.delete(id);
  }

  async getReasonStatusById(
    reasonId: number,
  ): Promise<ReasonStatusPersistent | null> {
    return this.repositoryReason.findOneBy({ id: reasonId });
  }
}
