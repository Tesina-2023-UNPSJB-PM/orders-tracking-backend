import { Module } from '@nestjs/common';
import { CustomersController } from './infrastructure/controllers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerData } from './infrastructure/persistence/entitiesDB/customerData';
import { CreateCustomer } from './application/useCases/createCustomer';
import { GetAllCustomers } from './application/useCases/getAllCustomers';
import { CustomerRepoInMemory } from './infrastructure/persistence/implementation/customerRepoInMemory';

const CustomerRepositoryProvider = {
  provide: 'CustomerRepository',
  useClass: CustomerRepoInMemory,
};
@Module({
  controllers: [CustomersController],
  providers: [CustomerRepositoryProvider, CreateCustomer, GetAllCustomers],
  exports: [CreateCustomer, GetAllCustomers],
  imports: [TypeOrmModule.forFeature([CustomerData])],
})
export class CustomersModule {}
