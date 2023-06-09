import { ApiProperty } from '@nestjs/swagger';

export class MasterDataOrderTypeDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
}
