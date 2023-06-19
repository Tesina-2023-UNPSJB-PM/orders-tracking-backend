import { ApiProperty } from '@nestjs/swagger';

export class OrderExecutionSectorDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
}
