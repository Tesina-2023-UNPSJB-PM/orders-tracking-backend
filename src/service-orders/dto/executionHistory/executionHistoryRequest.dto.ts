import { ApiProperty } from '@nestjs/swagger';

export class ExecutionHistoryRequestDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  executionId: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  reasonId: number;
  @ApiProperty()
  observations: string;
  @ApiProperty()
  attachments: string;
  @ApiProperty()
  registrationDate: Date;
}
