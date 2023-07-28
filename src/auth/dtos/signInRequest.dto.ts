import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class SignInRequestDTO {
  @ApiProperty()
  @Length(3, 150)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 25)
  password: string;
}
