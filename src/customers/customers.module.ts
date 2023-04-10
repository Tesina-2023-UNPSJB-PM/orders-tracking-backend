import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/customer.entity';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomersModule {}
