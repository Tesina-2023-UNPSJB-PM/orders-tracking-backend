import { Module } from '@nestjs/common';
import { CustomersController } from './infrastructure/controllers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCustomer } from './application/useCases/createCustomer';
import { GetAllCustomers } from './application/useCases/getAllCustomers';
import { CustomerPersistent } from './infrastructure/persistence/entitiesDB/customerPersistent';
import { AddressPersistent } from './infrastructure/persistence/entitiesDB/addressPersistent';
import { CustomerRepositoryPersistent } from './infrastructure/persistence/implementation/customerRepositoryPersistent';

const CustomerRepositoryProvider = {
  provide: 'CustomerRepository',
  useClass: CustomerRepositoryPersistent,
};
@Module({
  controllers: [CustomersController],
  providers: [CustomerRepositoryProvider, CreateCustomer, GetAllCustomers],
  exports: [CreateCustomer, GetAllCustomers],
  imports: [TypeOrmModule.forFeature([CustomerPersistent, AddressPersistent])],
})
export class CustomersModule {}
