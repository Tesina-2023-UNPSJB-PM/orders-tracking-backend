import { Module } from '@nestjs/common';
import { ServiceOrdersService } from './application/service-orders.service';
import { ServiceOrdersController } from './infrastructure/controller/service-orders.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ServiceOrdersController],
  providers: [ServiceOrdersService],
  imports: [CustomersModule, UsersModule],
})
export class ServiceOrdersModule {}
