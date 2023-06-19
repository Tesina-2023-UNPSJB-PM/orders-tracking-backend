import { ApiProperty } from '@nestjs/swagger';
import { OrderTypeDTO } from './orderType.dto';
import { OrderExecutionDTO } from './orderExecution.dto';
import { OrderLocationDTO } from './orderLocation.dto';
import { OrderStateDTO } from './orderState.dto';
import { CustomerResponseDTO } from 'src/customers/dto/customer-resp.dto';
import { OrderExecutionDetailDTO } from './orderExecutionDetail.dto';

export class ServiceOrderDetailResponse {
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
  execution?: OrderExecutionDetailDTO;
  @ApiProperty()
  customer?: CustomerResponseDTO;
  @ApiProperty()
  destination?: OrderLocationDTO;
  @ApiProperty()
  creationTime?: Date;
  @ApiProperty()
  detail?: any;
}