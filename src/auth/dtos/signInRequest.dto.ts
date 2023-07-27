import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
