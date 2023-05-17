import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersController } from './infrastructure/controllers/customers.controller';
import { CreateCustomer } from './application/useCases/createCustomer';
import { GetAllCustomers } from './application/useCases/getAllCustomers';
import { CustomerPersistent } from './infrastructure/persistence/entitiesDB/customerPersistent';
import { AddressPersistent } from './infrastructure/persistence/entitiesDB/addressPersistent';
import { CustomerRepositoryPersistent } from './infrastructure/persistence/implementation/customerRepositoryPersistent';
import { GetCustomerById } from './application/useCases/getCustomerById';
import { DeleteCustomer } from './application/useCases/deleteCustomer';
import { UpdateCustomer } from './application/useCases/updateCustomer';

const CustomerRepositoryProvider = {
  provide: 'CustomerRepository',
  useClass: CustomerRepositoryPersistent,
};
@Module({
  controllers: [CustomersController],
  providers: [
    CustomerRepositoryProvider,
    CreateCustomer,
    GetAllCustomers,
    GetCustomerById,
    UpdateCustomer,
    DeleteCustomer,
  ],
  exports: [
    CreateCustomer,
    GetAllCustomers,
    GetCustomerById,
    UpdateCustomer,
    DeleteCustomer,
  ],
  imports: [TypeOrmModule.forFeature([CustomerPersistent, AddressPersistent])],
})
export class CustomersModule {}
