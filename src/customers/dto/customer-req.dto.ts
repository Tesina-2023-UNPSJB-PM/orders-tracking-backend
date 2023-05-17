import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../shared/dto/address.dto';

export class CustomerRequestDTO {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty({ example: '00001' })
  customerNumber: string;
  //Cuit o Cuil
  @ApiProperty({ example: '24254789', description: 'Cuit o Cuil' })
  documentNumber: string;
  @ApiProperty({ example: 'Pepe', required: false })
  firstName?: string;
  @ApiProperty({ example: 'Sanchez', required: false })
  lastName?: string;
  @ApiProperty({
    example: 'Pepe S.A',
    description: 'Razón social',
    required: false,
  })
  businessName?: string;
  @ApiProperty({
    example: 'exampleCustomer@gmail.com',
    description: 'Email valid of customer',
    required: false,
  })
  email?: string;
  @ApiProperty({
    example: ['+5428045123145', '+54280454545'],
    required: false,
    description: 'Valid customer phones number.',
    isArray: true,
  })
  phones?: string[];
  @ApiProperty({ description: 'Customer is real address', required: true })
  address: AddressDTO;
}
