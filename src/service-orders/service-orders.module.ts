import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';
import { OrderExecutionFactory } from './application/factories/orderExecutionFactory';
import { ServiceOrderFactory } from './application/factories/serviceOrderFactory';
import { CreateServiceOrder } from './application/useCases/createServiceOrder';
import { GetAllServiceOrder } from './application/useCases/getAllServiceOrder';
import { GetServiceOrderById } from './application/useCases/getServiceOrderById';
import { UpdateServiceOrder } from './application/useCases/updateServiceOrder';
import { ServiceOrdersController } from './infrastructure/controller/serviceOrders.controller';
import { EmployeePersistent } from './infrastructure/persistence/entities/employeePersistent';
import { OrderExecutionPersistent } from './infrastructure/persistence/entities/orderExecutionPersistent';
import { OrderLocationPersistent } from './infrastructure/persistence/entities/orderLocationPersistent';
import { OrderTypePersistent } from './infrastructure/persistence/entities/orderTypePersistent';
import { SectorPersistent } from './infrastructure/persistence/entities/sectorPersistent';
import { ServiceOrderPersistent } from './infrastructure/persistence/entities/serviceOrderPersistent';
import { EmployeeRepositoryPersistent } from './infrastructure/persistence/implementation/employeeRepositoryPersistent';
import { OrderTypeRepositoryPersistent } from './infrastructure/persistence/implementation/orderTypeRepositoryPersistent';
import { SectorRepositoryPersistent } from './infrastructure/persistence/implementation/sectorRepositoryPersistent';
import { ServiceOrderRepositoryPersistence } from './infrastructure/persistence/implementation/serviceOrderRepositoryPersistent';
import { DeleteServiceOrder } from './application/useCases/deleteServiceOrder';
import { AddressPersistent } from 'src/shared/infrastructure/entitiesDB/addressPersistent';
import { MapperCustomerPersistent } from './infrastructure/persistence/mappers/mapperCustomerPersistent';
import { GetByFilterServiceOrder } from './application/useCases/getByFilterServiceOrder';
import { GetSummaryOrders } from './application/useCases/GetSummaryOrders';
import { ExecutionHistoryRepositoryPersistent } from './infrastructure/persistence/implementation/executionHistoryRepositoryPersistent';
import { ExecutionHistoryPersistent } from './infrastructure/persistence/entities/executionHistoryPersistent';
import { ReasonStatusPersistent } from './infrastructure/persistence/entities/reasonStatusPersistent';
import { ExecutionHistoryController } from './infrastructure/controller/executionHistory.controller';
import { CrudExecutionHistory } from './application/useCases/executionHistory/crudExecutionHistory';
import { GetHistoryByExecution } from './application/useCases/executionHistory/getHistoryByExecution';
import { UploadAttachment } from './application/useCases/executionHistory/uploadAttachment';

const repositoriesProvider = [
  {
    provide: 'ServiceOrderRepository',
    useClass: ServiceOrderRepositoryPersistence,
  },
  {
    provide: 'EmployeeRepository',
    useClass: EmployeeRepositoryPersistent,
  },
  {
    provide: 'SectorRepository',
    useClass: SectorRepositoryPersistent,
  },
  {
    provide: 'OrderTypeRepository',
    useClass: OrderTypeRepositoryPersistent,
  },
  {
    provide: 'ExecutionHistoryRepository',
    useClass: ExecutionHistoryRepositoryPersistent,
  },
];

@Module({
  controllers: [ServiceOrdersController, ExecutionHistoryController],
  providers: [
    ...repositoriesProvider,
    CreateServiceOrder,
    UpdateServiceOrder,
    GetAllServiceOrder,
    GetServiceOrderById,
    DeleteServiceOrder,
    GetByFilterServiceOrder,
    GetSummaryOrders,
    OrderExecutionFactory,
    ServiceOrderFactory,
    MapperCustomerPersistent,
    CrudExecutionHistory,
    GetHistoryByExecution,
    UploadAttachment,
  ],
  imports: [
    CustomersModule,
    TypeOrmModule.forFeature([
      ServiceOrderPersistent,
      SectorPersistent,
      EmployeePersistent,
      OrderTypePersistent,
      OrderExecutionPersistent,
      OrderLocationPersistent,
      AddressPersistent,
      ExecutionHistoryPersistent,
      ReasonStatusPersistent,
    ]),
  ],
})
export class ServiceOrdersModule {}
