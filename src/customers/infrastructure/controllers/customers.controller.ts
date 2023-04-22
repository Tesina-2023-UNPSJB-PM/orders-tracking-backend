import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { CreateCustomer } from '../../../customers/application/useCases/createCustomer';
import { GetAllCustomers } from '../../../customers/application/useCases/getAllCustomers';
import { CustomerRequestDTO } from '../../../customers/dto/customer-req.dto';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';
import { ApiResponse } from '@nestjs/swagger';
import { log } from 'console';

@Controller('/tracking-so/customers')
export class CustomersController {
    constructor(
        private createCustomer: CreateCustomer,
        private getAllCustomer: GetAllCustomers,
    ) {}

    @Post()
    @ApiResponse({ status: 201, type: CustomerResponseDTO })
    create(
        @Body() createCustomerDto: CustomerRequestDTO,
    ): Promise<CustomerResponseDTO> {
        try {
            return this.createCustomer.run(createCustomerDto);
        } catch (error) {
            console.log('Atrape el error');
            throw new HttpException(
                'Error creando cliente',
                HttpStatus.BAD_REQUEST,
            );
        }
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
