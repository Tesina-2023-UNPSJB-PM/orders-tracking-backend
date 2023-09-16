import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';

export interface ServiceOrderHistory {
  id: number;
  newStatus: OrderStatus;
}

export class CreateExecutionHistoryDTO {
  @ApiProperty()
  serviceOrderId: number;
  @ApiProperty()
  executionId?: number;
  @ApiProperty()
  assignedEmployeeId?: number;
  @ApiProperty()
  newStatus: OrderStatus;
  @ApiProperty()
  reasonId: number;
  @ApiProperty()
  observations?: string;
  @ApiProperty()
  attachments?: string;
}
