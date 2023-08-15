import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../shared/dto/address.dto';

export class OrderLocationDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  address?: AddressDTO;
  @ApiProperty()
  referenceInfo?: string;
}
