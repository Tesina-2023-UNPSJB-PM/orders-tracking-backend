import { ApiProperty } from '@nestjs/swagger';

export class MasterDataOrderStatusDTO {
  @ApiProperty()
  code: string;
}