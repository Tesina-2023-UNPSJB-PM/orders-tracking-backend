import { OrderEnumsUtils } from 'src/service-orders/domain/enums/service-order-enums';
import { ExecutionHistoryRepository } from 'src/service-orders/domain/repositories/executionHistoryRepository';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { CreateExecutionHistoryDTO } from 'src/service-orders/dto/executionHistory/createExecutionHistory.dto';
import { ExecutionHistoryResponseDTO } from 'src/service-orders/dto/executionHistory/executionHistoryResponse.dto';
import { UpdateExecutionHistoryDTO } from 'src/service-orders/dto/executionHistory/updateExecutionHistory.dto';
import { ExecutionHistoryPersistent } from 'src/service-orders/infrastructure/persistence/entities/executionHistoryPersistent';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

export class MapperExecutionHistory {
  constructor(
    private repo: ExecutionHistoryRepository,
    private repoOrderService: ServiceOrderRepository,
  ) {}

  public async mapCreateRequestToEntityPersistent(
    request: CreateExecutionHistoryDTO,
  ): Promise<ExecutionHistoryPersistent> {
    const execution = await this.repoOrderService.getOrderExecutionById(
      request.executionId ?? 0,
    );
    if (!execution)
      throw new InvalidDomainException(
        `Execution with id ${request.executionId} does not exist`,
      );

    const reason = await this.getReasonPersistent(request.reasonId);

    const result = new ExecutionHistoryPersistent();
    result.execution = execution;
    result.reason = reason;
    result.observations = request.observations ?? '';
    result.status = OrderEnumsUtils.getOrderStatus(request.status);
    result.registrationDate = new Date();
    result.attachments = request.attachments ?? '';

    return result;
  }

  public async mapUpdateRequestToEntityPersistent(
    request: UpdateExecutionHistoryDTO,
  ): Promise<ExecutionHistoryPersistent> {
    let reason;
    if (request.reasonId) {
      reason = await this.getReasonPersistent(request.reasonId);
    }

    const result = new ExecutionHistoryPersistent();
    result.id = request.id;
    if (reason) {
      result.reason = reason;
    }
    result.attachments = request.attachment ?? '';
    result.observations = request.observations ?? '';

    return result;
  }

  public mapToDTO(
    entity: ExecutionHistoryPersistent,
  ): ExecutionHistoryResponseDTO {
    const result = new ExecutionHistoryResponseDTO();
    result.id = entity.id;
    result.observations = entity.observations;
    result.registrationDate = entity.registrationDate;
    result.attachments = entity.attachments;
    result.status = entity.status;
    result.execution = entity.execution;
    result.reason = entity.reason;

    return result;
  }

  private async getReasonPersistent(reasonId: number) {
    const reason = await this.repo.getReasonStatusById(reasonId);

    if (!reason)
      throw new InvalidDomainException(
        `Reason with id ${reasonId} does not exist`,
      );
    return reason;
  }
}
