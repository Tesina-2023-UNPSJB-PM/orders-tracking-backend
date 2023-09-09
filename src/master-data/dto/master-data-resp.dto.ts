import { MasterDataOrderStatusDTO } from 'src/master-data/dto/master-data-order-status.dto';
import { OrderTypeDTO } from 'src/service-orders/dto/orderType.dto';
import { MasterDataCustomerDTO } from './master-data-customer.dto';
import { MasterDataEmployeeDTO } from './master-data-employee.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ReasonStatusDTO } from 'src/service-orders/dto/executionHistory/reasonStatus.dto';

export class MasterDataResponse {
  @ApiProperty()
  employees?: MasterDataEmployeeDTO[];
  @ApiProperty()
  customers?: MasterDataCustomerDTO[];
  @ApiProperty()
  serviceOrderTypes?: OrderTypeDTO[];
  @ApiProperty()
  serviceOrderStates?: MasterDataOrderStatusDTO[];
  @ApiProperty()
  reasons?: ReasonStatusDTO[];
}
