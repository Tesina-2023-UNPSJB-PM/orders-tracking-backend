import { ApiProperty } from '@nestjs/swagger';

export class ReasonStatusDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
}
