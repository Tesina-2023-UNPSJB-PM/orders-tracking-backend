import { GetMasterData } from './application/useCases/getMasterData';
import { MasterDataController } from './infraestructure/controllers/master-data.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MasterDataRepositoryPersistent } from './infraestructure/persistence/masterDataRepositoryPersistent';
import { MasterDataCustomerMapper } from './application/mappers/customers.mapper';
import { MasterDataEmployeesMapper } from './application/mappers/employees.mapper';
import { MasterDataStatesMapper } from './application/mappers/order-status.mapper';
import { MasterDataOrderTypeMapper } from './application/mappers/order-type.mapper';
import { GetEmployeeByUsername } from './application/useCases/getEmployeeByUsername';
import { MasterDataReasonMapper } from './application/mappers/reasons.mapper';

const MasterDataRepositoryProvider = {
  provide: 'MasterDataRepository',
  useClass: MasterDataRepositoryPersistent,
};

@Module({
  imports: [],
  controllers: [MasterDataController],
  providers: [
    MasterDataRepositoryProvider,
    GetMasterData,
    GetEmployeeByUsername,
    MasterDataRepositoryPersistent,
    MasterDataCustomerMapper,
    MasterDataEmployeesMapper,
    MasterDataStatesMapper,
    MasterDataOrderTypeMapper,
    MasterDataReasonMapper,
  ],
  exports: [GetEmployeeByUsername],
})
export class MasterDataModule {}
