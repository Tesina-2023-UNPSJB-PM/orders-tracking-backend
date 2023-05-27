import { ApiProperty } from '@nestjs/swagger';
import { OrderLocationDTO } from './orderLocation.dto';
import { OrderExecutionDTO } from './orderExecution.dto';

export class ServiceOrderRequestDTO {
  @ApiProperty()
  number?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  typeId?: number;
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
