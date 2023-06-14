import { OrderType } from 'src/service-orders/domain/entities/orderType.entity';
import { ServiceOrder } from 'src/service-orders/domain/entities/serviceOrder.entity';
import { OrderTypeDTO } from 'src/service-orders/dto/orderType.dto';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';
import { OrderLocationDTO } from '../../dto/orderLocation.dto';
import { OrderLocation } from 'src/service-orders/domain/entities/orderLocation.entity';
import { OrderExecution } from 'src/service-orders/domain/entities/orderExecution.entity';
import { OrderExecutionDTO } from 'src/service-orders/dto/orderExecution.dto';
import {
  OrderStates,
  OrderStatus,
} from 'src/service-orders/domain/enums/service-order-enums';
import { OrderStateDTO } from 'src/service-orders/dto/orderState.dto';

export class MapperServiceOrder {
  mapToDto(from: ServiceOrder): ServiceOrderResponse {
    const result = new ServiceOrderResponse();
    const values = from.getValues();
    result.id = from.id;
    result.number = values.number;
    result.description = values.description;
    result.creationTime = values.creationTime;
    result.priority = values.priority;
    result.status = this.getStatusDTOOf(values.status as OrderStatus);
    result.type = this.getTypeDto(values.type);
    result.customerId = values.customerId;
    result.destination = this.getOrderLocationDto(values.destination);
    result.execution = this.getServiceExecutionDto(values.execution);
    result.detail = values.detail;
    return result;
  }

  private getTypeDto(from?: OrderType): OrderTypeDTO {
    const result = new OrderTypeDTO();
    if (from) {
      result.id = from.id;
      result.name = from.name;
      result.description = from.description;
    }

    return result;
  }

  private getOrderLocationDto(destination?: OrderLocation): OrderLocationDTO {
    const result = new OrderLocationDTO();
    if (destination) {
      result.address = {
        id: destination.id,
        description: destination.address?.description || '',
        city: destination.address?.city || '',
        country: destination.address?.country || '',
        state: destination.address?.state || '',
        zipCode: destination.address?.zipCode,
        latitude: destination.address?.location.latitude,
        longitude: destination.address?.location.longitude,
      };
      result.referenceInfo = destination.referenceInfo;
    }
    return result;
  }

  private getServiceExecutionDto(
    execution?: OrderExecution,
  ): OrderExecutionDTO {
    const result = new OrderExecutionDTO();
    if (execution) {
      result.executorEmployeId = execution.executor?.id;
      result.assignedSectorId = execution.assignedSector?.id;
      result.observations = execution.observations;
      result.assignedTime = execution.assignedTime;
      result.estimatedResolutionTime = execution.estimatedResolutionTime;
      result.resolutionTime = execution.resolutionTime;
    }
    return result;
  }

  private getStatusDTOOf(status: OrderStatus): OrderStateDTO | undefined {
    return OrderStates.find(({ code }) => code == status);
  }
}
