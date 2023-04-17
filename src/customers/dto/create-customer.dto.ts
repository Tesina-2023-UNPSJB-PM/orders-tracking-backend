import { ApiProperty } from '@nestjs/swagger';
import { CustomerData } from '../infrastructure/persistence/entitiesDB/customerData';

export class CreateCustomerDto {
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
  })
  email?: string;
  @ApiProperty({ example: '+5428045123145' })
  phone?: string;
}
