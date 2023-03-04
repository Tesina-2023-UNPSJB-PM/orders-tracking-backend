import { Module } from '@nestjs/common';
import { ServiceOrdersService } from './service-orders.service';
import { ServiceOrdersController } from './service-orders.controller';
import { UsersService } from 'src/users/users.service';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  controllers: [ServiceOrdersController],
  providers: [ServiceOrdersService, UsersService, CustomersService],
})
export class ServiceOrdersModule {}
