import { ApiProperty } from '@nestjs/swagger';
import { OrderTypeDTO } from './orderType.dto';
import { OrderExecutionDTO } from './orderExecution.dto';
import { OrderLocationDTO } from './orderLocation.dto';

export class ServiceOrderResponseDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  number?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  type?: OrderTypeDTO;
  @ApiProperty()
  status?: string;
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
