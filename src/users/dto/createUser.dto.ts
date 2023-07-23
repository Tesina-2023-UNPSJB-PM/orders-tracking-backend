import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @Length(0, 254)
  firstName: string;

  @ApiProperty()
  @Length(0, 254)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(3, 150)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 25)
  password: string;
}
