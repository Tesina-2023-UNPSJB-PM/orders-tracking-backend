import { OrderEnumsUtils } from 'src/service-orders/domain/enums/service-order-enums';
import { ExecutionHistoryRepository } from 'src/service-orders/domain/repositories/executionHistoryRepository';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { ExecutionHistoryRequestDTO } from 'src/service-orders/dto/executionHistory/executionHistoryRequest.dto';
import { ExecutionHistoryResponseDTO } from 'src/service-orders/dto/executionHistory/executionHistoryResponse.dto';
import { ExecutionHistoryPersistent } from 'src/service-orders/infrastructure/persistence/entities/executionHistoryPersistent';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

export class MapperExecutionHistory {
  constructor(
    private repo: ExecutionHistoryRepository,
    private repoOrderService: ServiceOrderRepository,
  ) {}

  public async mapToEntityPersistent(
    request: ExecutionHistoryRequestDTO,
  ): Promise<ExecutionHistoryPersistent> {
    const execution = await this.repoOrderService.getOrderExecutionById(
      request.executionId,
    );
    if (!execution)
      throw new InvalidDomainException(
        `Execution with id ${request.id} does not exist`,
      );

    const reason = await this.repo.getReasonStatusById(request.reasonId);

    if (!reason)
      throw new InvalidDomainException(
        `Reason with id ${request.reasonId} does not exist`,
      );

    const result = new ExecutionHistoryPersistent();
    result.execution = execution;
    result.reason = reason;
    result.observations = request.observations;
    result.status = OrderEnumsUtils.getOrderStatus(request.status);
    result.id = request.id;
    result.registrationDate = request.registrationDate;
    result.attachments = request.attachments;

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
}
