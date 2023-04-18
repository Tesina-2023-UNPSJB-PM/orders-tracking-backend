import { ApiProperty } from '@nestjs/swagger';

export class CustomerRequestDTO {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty({ example: '00001' })
  customerNumber: string;
  //Cuit o Cuil
  @ApiProperty({ example: '24254789', description: 'Cuit o Cuil' })
  documentNumber: string;
  @ApiProperty({ example: 'Pepe' })
  firstName: string;
  @ApiProperty({ example: 'Sanchez' })
  lastName: string;
  @ApiProperty({
    example: 'exampleCustomer@gmail.com',
    description: 'Email valid of customer',
    required: false,
  })
  email?: string;
  @ApiProperty({
    example: '+5428045123145',
    required: false,
    description: 'Valid customer phone number.',
  })
  phone?: string;
}
