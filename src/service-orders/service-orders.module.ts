import { Module } from '@nestjs/common';
import { ServiceOrdersController } from './infrastructure/controller/serviceOrders.controller';
import { CustomersModule } from '../customers/customers.module';
import { CreateServiceOrder } from './application/useCases/createServiceOrder';
import { OrderExecutionFactory } from './application/factories/orderExecutionFactory';
import { ServiceOrderPersistence } from './infrastructure/persistence/implementation/serviceOrderPersistent';
import { EmployeePersistent } from './infrastructure/persistence/implementation/employeePersistent';
import { SectorPersistent } from './infrastructure/persistence/implementation/sectorPersistent';
import { OrderTypePersistent } from './infrastructure/persistence/implementation/orderTypePersistent';
import { ServiceOrderFactory } from './application/factories/serviceOrderFactory';
import { GetAllServiceOrder } from './application/useCases/getAllServiceOrder';
import { GetServiceOrderById } from './application/useCases/getServiceOrderById';

const repositoriesProvider = [
  {
    provide: 'ServiceOrderRepository',
    useClass: ServiceOrderPersistence,
  },
  {
    provide: 'EmployeeRepository',
    useClass: EmployeePersistent,
  },
  {
    provide: 'SectorRepository',
    useClass: SectorPersistent,
  },
  {
    provide: 'OrderTypeRepository',
    useClass: OrderTypePersistent,
  },
];

@Module({
  controllers: [ServiceOrdersController],
  providers: [
    ...repositoriesProvider,
    CreateServiceOrder,
    GetAllServiceOrder,
    GetServiceOrderById,
    OrderExecutionFactory,
    ServiceOrderFactory,
  ],
  imports: [CustomersModule],
})
export class ServiceOrdersModule {}
