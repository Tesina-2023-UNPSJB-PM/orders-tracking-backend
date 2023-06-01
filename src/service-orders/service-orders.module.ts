import { Module } from '@nestjs/common';
import { ServiceOrdersController } from './infrastructure/controller/serviceOrders.controller';
import { CustomersModule } from '../customers/customers.module';
import { CreateServiceOrder } from './application/useCases/createServiceOrder';
import { OrderExecutionFactory } from './application/factories/orderExecutionFactory';
import { ServiceOrderRepositoryPersistence } from './infrastructure/persistence/implementation/serviceOrderRepositoryPersistent';
import { EmployeeRepositoryPersistent } from './infrastructure/persistence/implementation/employeeRepositoryPersistent';
import { SectorRepositoryPersistent } from './infrastructure/persistence/implementation/sectorRepositoryPersistent';
import { OrderTypeRepositoryPersistent } from './infrastructure/persistence/implementation/orderTypeRepositoryPersistent';
import { ServiceOrderFactory } from './application/factories/serviceOrderFactory';
import { GetAllServiceOrder } from './application/useCases/getAllServiceOrder';
import { GetServiceOrderById } from './application/useCases/getServiceOrderById';
import { UpdateServiceOrder } from './application/useCases/updateServiceOrder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrderPersistent } from './infrastructure/persistence/entities/serviceOrderPersistent';
import { SectorPersistent } from './infrastructure/persistence/entities/sectorPersistent';
import { EmployeePersistent } from './infrastructure/persistence/entities/employeePersistent';
import { OrderTypePersistent } from './infrastructure/persistence/entities/orderTypePersistent';
import { OrderExecutionPersistent } from './infrastructure/persistence/entities/orderExecutionPersistent';
import { OrderLocationPersistent } from './infrastructure/persistence/entities/orderLocationPersistent';

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
    OrderExecutionFactory,
    ServiceOrderFactory,
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
    ]),
  ],
})
export class ServiceOrdersModule {}
