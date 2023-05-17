import { Module } from '@nestjs/common';
import { ServiceOrdersController } from './infrastructure/controller/serviceOrders.controller';
import { CustomersModule } from '../customers/customers.module';
import { CreateServiceOrder } from './application/useCases/createServiceOrder';
import { ServiceOrderPersistence } from './infrastructure/persistence/implementation/serviceOrderPersistent';

const ServiceOrderRepositoryProvider = {
  provide: 'ServiceOrderRepository',
  useClass: ServiceOrderPersistence,
};

@Module({
  controllers: [ServiceOrdersController],
  providers: [ServiceOrderRepositoryProvider, CreateServiceOrder],
  imports: [CustomersModule],
})
export class ServiceOrdersModule {}
