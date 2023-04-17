import { Inject, Injectable } from '@nestjs/common';

import { CustomerAlreadyExistsException } from '../../../customers/domain/exceptions/customerAlreadyExists';
import { Customer } from '../../domain/entities/customer.entity';
import { CreateCustomerDto } from '../../../customers/dto/create-customer.dto';
import { ExistsCustomerByNumber } from '../../../customers/domain/services/existsCustomerByNumber';
import { CustomerRepository } from 'src/customers/domain/repositories/customerRepository';

@Injectable()
export class CreateCustomer {
  private readonly existsCustomerByNumber: ExistsCustomerByNumber;

  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {
    this.existsCustomerByNumber = new ExistsCustomerByNumber(
      customerRepository,
    );
  }

  async run(data: CreateCustomerDto): Promise<Customer> {
    const existCustomer = await this.existsCustomerByNumber.run(
      data.customerNumber,
    );

    if (existCustomer)
      throw new CustomerAlreadyExistsException(data.customerNumber);

    const newCustomer = Customer.createCustomer({ ...data });
    const customerCreated = await this.customerRepository.save(newCustomer);

    return customerCreated;
  }
}
