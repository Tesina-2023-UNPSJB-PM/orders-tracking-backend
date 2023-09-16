import { Inject, Injectable } from '@nestjs/common';
import { ExecutionHistoryResponseDTO } from 'src/service-orders/dto/executionHistory/executionHistoryResponse.dto';
import { MapperExecutionHistory } from '../../mappers/mapperExecutionHistory';
import { ExecutionHistoryRepository } from 'src/service-orders/domain/repositories/executionHistoryRepository';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';

@Injectable()
export class GetHistoryByExecution {
  private mapper: MapperExecutionHistory;

  constructor(
    @Inject('ExecutionHistoryRepository')
    private repo: ExecutionHistoryRepository,
    @Inject('ServiceOrderRepository')
    private repoOrderService: ServiceOrderRepository,
  ) {
    this.mapper = new MapperExecutionHistory(repo, repoOrderService);
  }

  async run(executionId: number): Promise<ExecutionHistoryResponseDTO[]> {
    const result = await this.repo.getHistoryOfExecution(executionId);

    return result.map((item) => this.mapper.mapToDTO(item));
  }
}
