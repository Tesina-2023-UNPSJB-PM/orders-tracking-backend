import { ApiProperty } from '@nestjs/swagger';
import { OrderTypeDTO } from './orderType.dto';
import { OrderExecutionDTO } from './orderExecution.dto';
import { OrderLocationDTO } from './orderLocation.dto';
import { OrderStateDTO } from './orderState.dto';

export class ServiceOrderResponse {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  number?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  type?: OrderTypeDTO;
  @ApiProperty()
  status?: OrderStateDTO;
  @ApiProperty()
  priority?: string;
  @ApiProperty()
  execution?: OrderExecutionDTO;
  @ApiProperty()
  customerId?: number;
  @ApiProperty()
  destination?: OrderLocationDTO;
  @ApiProperty()
  creationTime?: Date;
  @ApiProperty()
  detail?: any;
}
