import { Inject, Injectable } from '@nestjs/common';
import { GetCustomerById } from 'src/customers/application/useCases/getCustomerById';
import { ServiceOrder } from 'src/service-orders/domain/entities/serviceOrder.entity';
import { OrderEnumsUtils } from 'src/service-orders/domain/enums/service-order-enums';
import { OrderTypeRepository } from 'src/service-orders/domain/repositories/orderTypeRepository';
import { ServiceOrderRequest } from 'src/service-orders/dto/serviceOrderReq.dto';
import { OrderExecutionFactory } from './orderExecutionFactory';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { MapperOrderLocation } from '../mappers/mapperOrderLocation';

@Injectable()
export class ServiceOrderFactory {
  mapOrderLocation: MapperOrderLocation;
  constructor(
    private getCustomerById: GetCustomerById,
    @Inject('OrderTypeRepository')
    private orderTypeRepository: OrderTypeRepository,
    private mapOrderExecution: OrderExecutionFactory,
  ) {
    this.mapOrderLocation = new MapperOrderLocation();
  }
  public async createEntity(from: ServiceOrderRequest): Promise<ServiceOrder> {
    const orderExecution = await this.mapOrderExecution.createEntity(
      from.execution,
    );

    const customerDTO = await this.getCustomerById.run(from.customerId);
    if (!customerDTO) {
      throw new InvalidDomainException(
        `The customer with id ${from.customerId} does not exist`,
      );
    }
    const orderType = await this.orderTypeRepository.getById(from.typeId);

    if (!from.destination) {
      throw new InvalidDomainException('Service order destination undefined');
    }

    const orderLocation = this.mapOrderLocation.mapFromDtoToEntity(
      from.destination,
      customerDTO.address,
    );

    return ServiceOrder.create(
      {
        number: from.number,
        description: from.description,
        type: orderType ? orderType : undefined,
        status: OrderEnumsUtils.getOrderStatus(from.status || ''),
        priority: OrderEnumsUtils.getOrderPriority(from.priority || ''),
        customerId: from.customerId,
        destination: orderLocation,
        execution: orderExecution || undefined,
        creationTime: from.creationTime,
        detail: from.detail,
      },
      from.id,
    );
  }
}
