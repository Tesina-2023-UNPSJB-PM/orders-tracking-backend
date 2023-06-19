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
];

@Module({
  controllers: [ServiceOrdersController],
  providers: [
    ...repositoriesProvider,
    CreateServiceOrder,
    UpdateServiceOrder,
    GetAllServiceOrder,
    GetServiceOrderById,
    DeleteServiceOrder,
    GetByFilterServiceOrder,
    OrderExecutionFactory,
    ServiceOrderFactory,
    MapperCustomerPersistent,
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
    ]),
  ],
})
export class ServiceOrdersModule {}
