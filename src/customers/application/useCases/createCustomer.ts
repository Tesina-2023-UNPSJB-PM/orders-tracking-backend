import { Inject, Injectable } from '@nestjs/common';

import { CustomerAlreadyExistsException } from '../../../customers/domain/exceptions/customerAlreadyExists';
import { Customer } from '../../domain/entities/customer.entity';
import { ExistsCustomerByNumber } from '../../../customers/domain/services/existsCustomerByNumber';
import { CustomerRepository } from '../../../customers/domain/repositories/customerRepository';
import { CustomerRequestDTO } from '../../../customers/dto/customer-req.dto';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';
import { CustomerMapper } from '../mappers/customerMapper';

@Injectable()
export class CreateCustomer {
    private readonly existsCustomerByNumber: ExistsCustomerByNumber;
    private readonly customerMapper: CustomerMapper;

    constructor(
        @Inject('CustomerRepository')
        private customerRepository: CustomerRepository,
    ) {
        this.existsCustomerByNumber = new ExistsCustomerByNumber(
            customerRepository,
        );
        this.customerMapper = new CustomerMapper();
    }

    async run(data: CustomerRequestDTO): Promise<CustomerResponseDTO> {
        const existCustomer = await this.existsCustomerByNumber.run(
            data.customerNumber,
        );

        if (existCustomer)
            throw new CustomerAlreadyExistsException(data.customerNumber);

        const newCustomer = Customer.createCustomer({ ...data });
        const customerCreated = await this.customerRepository.save(newCustomer);

        return this.customerMapper.mapToCustomerResponseDTO(customerCreated);
    }
}
