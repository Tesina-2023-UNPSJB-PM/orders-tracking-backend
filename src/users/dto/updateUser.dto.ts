import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Length,
} from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @ApiProperty()
  @IsOptional()
  @Length(0, 254)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @Length(0, 254)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 150)
  username: string;

  @ApiProperty()
  @IsOptional()
  @Length(8, 25)
  password: string;

  @ApiProperty()
  @IsOptional()
  enabled: boolean;
}
