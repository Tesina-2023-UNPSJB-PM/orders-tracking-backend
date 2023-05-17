import { ApiProperty } from '@nestjs/swagger';

export class AddressDTO {
  @ApiProperty()
  description: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  zipCode?: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  latitude?: number;
  @ApiProperty()
  longitude?: number;
}
