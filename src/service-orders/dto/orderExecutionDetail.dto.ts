import { ApiProperty } from '@nestjs/swagger';
import { OrderExecutionEmployeeDTO } from './orderExecutionEmployee.dto';
import { OrderExecutionSectorDTO } from './orderExecutionSector.dto';

export class OrderExecutionDetailDTO {
  @ApiProperty()
  observations?: string;
  @ApiProperty()
  executorEmployee?: OrderExecutionEmployeeDTO;
  @ApiProperty()
  assignedSector?: OrderExecutionSectorDTO;
  @ApiProperty()
  assignedTime?: Date;
  @ApiProperty()
  estimatedResolutionTime?: Date;
  @ApiProperty()
  resolutionTime?: Date;
}