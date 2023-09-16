import { ApiProperty } from '@nestjs/swagger';
import { OrderExecutionDTO } from '../orderExecution.dto';
import { ReasonStatusDTO } from './reasonStatus.dto';

export class ExecutionHistoryResponseDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  execution: OrderExecutionDTO;
  @ApiProperty()
  status: string;
  @ApiProperty()
  reason: ReasonStatusDTO;
  @ApiProperty()
  observations: string;
  @ApiProperty()
  attachments: string;
  @ApiProperty()
  registrationDate: Date;
}
