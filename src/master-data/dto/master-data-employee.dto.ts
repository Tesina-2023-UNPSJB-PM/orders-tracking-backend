import { ApiProperty } from '@nestjs/swagger';

export class MasterDataEmployeeDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  recordNumber: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
