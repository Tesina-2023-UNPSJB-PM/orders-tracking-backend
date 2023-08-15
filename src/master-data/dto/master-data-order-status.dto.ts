import { ApiProperty } from '@nestjs/swagger';

export class MasterDataOrderStatusDTO {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
