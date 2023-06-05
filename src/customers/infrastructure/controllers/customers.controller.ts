import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateCustomer } from '../../../customers/application/useCases/createCustomer';
import { GetAllCustomers } from '../../../customers/application/useCases/getAllCustomers';
import { CustomerRequestDTO } from '../../../customers/dto/customer-req.dto';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';
import { GetCustomerById } from 'src/customers/application/useCases/getCustomerById';
import { Response } from 'express';
import { DeleteCustomer } from 'src/customers/application/useCases/deleteCustomer';
import { UpdateCustomer } from 'src/customers/application/useCases/updateCustomer';

@Controller('/tracking-so/customers')
export class CustomersController {
  constructor(
    private createCustomer: CreateCustomer,
    private getAllCustomer: GetAllCustomers,
    private getCustomerById: GetCustomerById,
    private updateCustomer: UpdateCustomer,
    private deleteCustomer: DeleteCustomer,
  ) {}

  @Post()
  @ApiResponse({ status: 201, type: CustomerResponseDTO })
  @HttpCode(HttpStatus.CREATED)
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
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const result = await this.getCustomerById.run(id);

    if (!result) {
      response.status(HttpStatus.NOT_FOUND);
      response.send();
    }

    response.send(result);
  }

  @Patch()
  async update(@Body() updateCustomerDto: CustomerRequestDTO) {
    const result = await this.updateCustomer.run(updateCustomerDto);

    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCustomer.run(id);
  }
}
