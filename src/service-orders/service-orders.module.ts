import { Module } from '@nestjs/common';
import { ServiceOrdersService } from './service-orders.service';
import { ServiceOrdersController } from './service-orders.controller';
import { UsersService } from 'src/users/users.service';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  controllers: [ServiceOrdersController],
  providers: [ServiceOrdersService, UsersService],
  imports: [CustomersModule],
})
export class ServiceOrdersModule {}
