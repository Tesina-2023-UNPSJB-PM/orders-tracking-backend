import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { CreateCustomer } from 'src/customers/application/useCases/createCustomer';
import { GetAllCustomers } from 'src/customers/application/useCases/getAllCustomers';

@Controller('/tracking-so/customers')
export class CustomersController {
  constructor(
    private createCustomer: CreateCustomer,
    private getAllCustomer: GetAllCustomers,
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomer.run(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.getAllCustomer.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new Error('Use case not implemented');
  }

  @Patch()
  update(@Body() updateCustomerDto: UpdateCustomerDto) {
    throw new Error('Use case not implemented');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new Error('Use case not implemented');
  }
}
