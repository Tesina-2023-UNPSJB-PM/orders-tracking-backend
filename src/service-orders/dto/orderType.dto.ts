import { ApiProperty } from '@nestjs/swagger';

export class OrderTypeDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
}
