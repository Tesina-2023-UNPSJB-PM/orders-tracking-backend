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
import { PubNubClient } from 'src/service-orders/infrastructure/client/pubnub.client';

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
    private notifier: PubNubClient,
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
    const isAssignOrder =
      request.status === OrderStatus.PENDING &&
      serviceOrder.status === OrderStatus.UNASSIGNED;

    const isReleaseOrder =
      request.status === OrderStatus.UNASSIGNED &&
      serviceOrder.status === OrderStatus.PENDING;

    const isOrderStatusChange =
      request.status !== serviceOrder.status &&
      !isAssignOrder &&
      !isReleaseOrder;

    if (isAssignOrder) {
      const employeeAssigned = await this.repoEmployee.getById(
        request.assignedEmployeeId,
      );
      if (!employeeAssigned)
        throw new InvalidDomainException(
          `Employee with id ${request.assignedEmployeeId} not exist`,
        );

      serviceOrder.assignToEmployee(employeeAssigned);
      updateOrder = true;
    }

    if (isReleaseOrder) {
      serviceOrder.releaseOrder();
      updateOrder = true;
    }

    if (isOrderStatusChange) {
      serviceOrder.changeStatus(request.status);
      updateOrder = true;
    }

    if (updateOrder) {
      this.repoOrderService.update(serviceOrder);
      this.notifyOrderUpdate(serviceOrder);
    }
  }

  private notifyOrderUpdate(serviceOrder: ServiceOrder) {
    const payloadNotification = serviceOrder.getNotification();
    if (payloadNotification) {
      this.notifier.sendNotification(payloadNotification);
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
