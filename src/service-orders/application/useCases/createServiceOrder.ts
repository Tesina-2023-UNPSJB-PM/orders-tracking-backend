import { Inject, Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from '../../../service-orders/domain/repositories/serviceOrderRepository';
import { ServiceOrderRequestDTO } from '../../../service-orders/dto/request/serviceOrderReq.dto';
import { EmployeeRepository } from 'src/service-orders/domain/repositories/employeeRepository';
import { GetCustomerById } from 'src/customers/application/useCases/getCustomerById';
import { SectorRepository } from 'src/service-orders/domain/repositories/sectorRepository';
import { ServiceOrder } from 'src/service-orders/domain/entities/serviceOrder.entity';
import { OrderTypeRepository } from 'src/service-orders/domain/repositories/orderTypeRepository';
import { OrderEnumsUtils } from 'src/service-orders/domain/enums/service-order-enums';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { OrderLocation } from 'src/service-orders/domain/entities/order-location.entity';
import { Address } from 'src/shared/domain/entities/address.entity';

@Injectable()
export class CreateServiceOrder {
  constructor(
    @Inject('ServiceOrderRepository')
    private serviceOrderRepo: ServiceOrderRepository,
    @Inject('EmployeeRepository') private employeeRepo: EmployeeRepository,
    private getCustomerById: GetCustomerById,
    @Inject('SectorRepository') private sectorRepository: SectorRepository,
    @Inject('OrderTypeRepository')
    private orderTypeRepository: OrderTypeRepository,
  ) {}

  async run(data: ServiceOrderRequestDTO): Promise<ServiceOrderResponseDTO> {
    // Mapping request from dto to entity
    const newServiceOrder = await this.mapFromDTOToEntity(data);
    // Save entity
    this.serviceOrderRepo.save(newServiceOrder);
    // Mapping response from entity to dto
  }

  private async mapFromDTOToEntity(
    from: ServiceOrderRequestDTO,
  ): Promise<ServiceOrder> {
    // Find and assign employee entity
    const employee = await this.employeeRepo.getById(from.executorEmployeeId);
    // Find and assign customer entity
    const customerDTO = await this.getCustomerById.run(from.customerId);
    if (!customerDTO) {
      throw new InvalidDomainException(
        `The customer with id ${from.customerId} does not exist`,
      );
    }
    // Find and assign sector entity
    const sector = await this.sectorRepository.getById(from.assignedSectorId);
    // Find typeOrde entity
    const orderType = await this.orderTypeRepository.getById(from.typeId);

    /*const address = Address.createAddress({
      ...from.destination.address,
    });
    const orderLocation = OrderLocation.createOrderLocation({
      address: from.destination.address,
    });*/

    return ServiceOrder.create({
      number: from.number,
      description: from.description,
      observations: from.observations,
      type: orderType ? orderType : undefined,
      status: OrderEnumsUtils.getOrderStatus(from.status),
      priority: OrderEnumsUtils.getOrderPriority(from.priority),
      executor: employee ? employee : undefined,
      assignedSector: sector ? sector : undefined,
      customerId: from.customerId,
      creationTime: from.creationTime,
      assignedTime: from.assignedTime,
      estimatedResolutionTime: from.estimatedResolutionTime,
      resolutionTime: from.resolutionTime,
      detail: from.detail,
    });
  }
}
