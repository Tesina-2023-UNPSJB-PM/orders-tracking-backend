import { ApiProperty } from '@nestjs/swagger';

export class OrderExecutionEmployeeDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  recordNumber: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}