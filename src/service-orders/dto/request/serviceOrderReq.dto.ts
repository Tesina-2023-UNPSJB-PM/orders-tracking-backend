import { ApiProperty } from '@nestjs/swagger';
import { OrderLocationDTO } from '../orderLocation.dto';

export class ServiceOrderRequestDTO {
  @ApiProperty()
  number: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  observations: string;
  @ApiProperty()
  typeId: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  priority: string;
  @ApiProperty()
  executorEmployeeId: number;
  @ApiProperty()
  assignedSectorId: number;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  destination: OrderLocationDTO;
  @ApiProperty()
  creationTime: Date;
  @ApiProperty()
  assignedTime: Date;
  @ApiProperty()
  estimatedResolutionTime: Date;
  @ApiProperty()
  resolutionTime: Date;
  @ApiProperty()
  detail: object;
}
