import { ApiProperty } from '@nestjs/swagger';

export class OrderExecutionDTO {
  @ApiProperty()
  observations?: string;
  @ApiProperty()
  executorEmployeId?: number;
  @ApiProperty()
  assignedSectorId?: number;
  @ApiProperty()
  assignedTime?: Date;
  @ApiProperty()
  estimatedResolutionTime?: Date;
  @ApiProperty()
  resolutionTime?: Date;
}
