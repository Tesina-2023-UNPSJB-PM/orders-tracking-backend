import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceOrdersModule } from './service-orders/service-orders.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ServiceOrdersModule, UsersModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
