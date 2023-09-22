import { Inject, Injectable } from '@nestjs/common';
import { ExecutionHistoryRepository } from 'src/service-orders/domain/repositories/executionHistoryRepository';
import { ServiceOrderRepository } from 'src/service-orders/domain/repositories/serviceOrderRepository';
import { CreateExecutionHistoryDTO } from 'src/service-orders/dto/executionHistory/createExecutionHistory.dto';
import { ExecutionHistoryResponseDTO } from 'src/service-orders/dto/executionHistory/executionHistoryResponse.dto';
import { MapperExecutionHistory } from '../../mappers/mapperExecutionHistory';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';
import { EmployeeRepository } from 'src/service-orders/domain/repositories/employeeRepository';
import { UpdateExecutionHistoryDTO } from 'src/service-orders/dto/executionHistory/updateExecutionHistory.dto';
import { ServiceOrder } from 'src/service-orders/domain/entities/serviceOrder.entity';

@Injectable()
export class CrudExecutionHistory {
  private mapper: MapperExecutionHistory;

  constructor(
    @Inject('ExecutionHistoryRepository')
    private repo: ExecutionHistoryRepository,
    @Inject('ServiceOrderRepository')
    private repoOrderService: ServiceOrderRepository,
    @Inject('EmployeeRepository')
    private repoEmployee: EmployeeRepository,
  ) {
    this.mapper = new MapperExecutionHistory(repo, repoOrderService);
  }

  async create(request: CreateExecutionHistoryDTO): Promise<number> {
    // Recuperar Orden de servicio
    const serviceOrder = await this.getServiceOrder(request);

    // Actualizar la OS si corresponde
    await this.updateOrderIfApplicable(request, serviceOrder);

    // Guardar historico
    request.executionId = serviceOrder.getValues().execution?.id;
    const executionHistoryPersistent =
      await this.mapper.mapCreateRequestToEntityPersistent(request);

    return this.repo.save(executionHistoryPersistent);
  }

  private async getServiceOrder(request: CreateExecutionHistoryDTO) {
    const serviceOrder = await this.repoOrderService.getById(
      request.serviceOrderId,
    );
    if (!serviceOrder)
      throw new InvalidDomainException(
        `Service order with id ${request.serviceOrderId} no exist`,
      );
    return serviceOrder;
  }

  private async updateOrderIfApplicable(
    request: CreateExecutionHistoryDTO,
    serviceOrder: ServiceOrder,
  ) {
    let updateOrder = false;
    if (request.newStatus && request.newStatus !== serviceOrder.status) {
      serviceOrder.changeStatus(request.newStatus);
      updateOrder = true;
    }

    if (
      request.newStatus &&
      request.newStatus === OrderStatus.PENDING &&
      request.assignedEmployeeId
    ) {
      const employeeAssigned = await this.repoEmployee.getById(
        request.assignedEmployeeId,
      );
      if (!employeeAssigned)
        throw new InvalidDomainException(
          `Employee with id ${request.assignedEmployeeId} not exist`,
        );

      const orderExecution = serviceOrder.getValues().execution;
      if (orderExecution) {
        orderExecution.executor = employeeAssigned;
      }
      updateOrder = true;
    }

    if (updateOrder) {
      this.repoOrderService.update(serviceOrder);
    }
  }

  async update(request: UpdateExecutionHistoryDTO): Promise<void> {
    const entity = await this.mapper.mapUpdateRequestToEntityPersistent(
      request,
    );

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
