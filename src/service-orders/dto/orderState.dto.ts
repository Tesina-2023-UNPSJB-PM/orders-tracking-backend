import { ApiProperty } from '@nestjs/swagger';

export class OrderStateDTO {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
