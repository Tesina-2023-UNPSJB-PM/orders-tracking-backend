import { Inject, Injectable } from '@nestjs/common';
import { ExecutionHistoryRepository } from 'src/service-orders/domain/repositories/executionHistoryRepository';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ExecutionHistoryRequestDTO } from 'src/service-orders/dto/executionHistory/executionHistoryRequest.dto';
import { ExecutionHistoryResponseDTO } from 'src/service-orders/dto/executionHistory/executionHistoryResponse.dto';
import { MapperExecutionHistory } from '../../mappers/mapperExecutionHistory';

@Injectable()
export class CrudExecutionHistory {
  private mapper: MapperExecutionHistory;

  constructor(
    @Inject('ExecutionHistoryRepository')
    private repo: ExecutionHistoryRepository,
    @Inject('ServiceOrderRepository')
    private repoOrderService: ServiceOrderRepository,
  ) {
    this.mapper = new MapperExecutionHistory(repo, repoOrderService);
  }

  async create(request: ExecutionHistoryRequestDTO): Promise<number> {
    const executionHistoryPersistent = await this.mapper.mapToEntityPersistent(
      request,
    );

    return this.repo.save(executionHistoryPersistent);
  }

  async update(request: ExecutionHistoryRequestDTO): Promise<void> {
    const entity = await this.mapper.mapToEntityPersistent(request);

    return this.repo.update(entity);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }

  async getAll(): Promise<ExecutionHistoryResponseDTO[]> {
    const result = await this.repo.getAll();

    return result ? result.map((history) => this.mapper.mapToDTO(history)) : [];
  }

  async getById(id: number): Promise<ExecutionHistoryResponseDTO | null> {
    const result = await this.repo.getById(id);

    return result ? this.mapper.mapToDTO(result) : null;
  }
}
