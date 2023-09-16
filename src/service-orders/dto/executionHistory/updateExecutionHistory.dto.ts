import { ApiProperty } from '@nestjs/swagger';

export class UpdateExecutionHistoryDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  reasonId?: number;
  @ApiProperty()
  observations?: string;
  @ApiProperty()
  attachment?: string;
}
