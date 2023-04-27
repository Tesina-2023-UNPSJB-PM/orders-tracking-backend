import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateCustomer } from '../../../customers/application/useCases/createCustomer';
import { GetAllCustomers } from '../../../customers/application/useCases/getAllCustomers';
import { CustomerRequestDTO } from '../../../customers/dto/customer-req.dto';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';
import { InvalidDomainExceptionFilter } from '../../../shared/infrastructure/filters/invalid-domain-exception.filter';

@Controller('/tracking-so/customers')
export class CustomersController {
  constructor(
    private createCustomer: CreateCustomer,
    private getAllCustomer: GetAllCustomers,
  ) {}

  @Post()
  @ApiResponse({ status: 201, type: CustomerResponseDTO })
  @UseFilters(new InvalidDomainExceptionFilter())
  async create(
    @Body() createCustomerDto: CustomerRequestDTO,
  ): Promise<CustomerResponseDTO | BadRequestException> {
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
  update(@Body() updateCustomerDto: CustomerRequestDTO) {
    throw new Error('Use case not implemented');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new Error('Use case not implemented');
  }
}
