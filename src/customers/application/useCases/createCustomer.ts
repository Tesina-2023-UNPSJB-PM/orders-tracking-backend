import { Inject, Injectable } from '@nestjs/common';

import { CustomerAlreadyExistsException } from '../../../customers/domain/exceptions/customerAlreadyExists';
import { Customer } from '../../domain/entities/customer.entity';
import { ExistsCustomerByNumber } from '../../../customers/domain/services/existsCustomerByNumber';
import { CustomerRepository } from '../../../customers/domain/repositories/customerRepository';
import { CustomerRequestDTO } from '../../../customers/dto/customer-req.dto';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';

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

  async run(data: CustomerRequestDTO): Promise<CustomerResponseDTO> {
    const existCustomer = await this.existsCustomerByNumber.run(
      data.customerNumber,
    );

    if (existCustomer)
      throw new CustomerAlreadyExistsException(data.customerNumber);

    const newCustomer = Customer.createCustomer({ ...data });
    const customerCreated = await this.customerRepository.save(newCustomer);

    return this.mapCustomerEntityToDto(customerCreated);
  }

  private mapCustomerEntityToDto(
    customerEntity: Customer,
  ): CustomerResponseDTO {
    const result = new CustomerResponseDTO();
    result.id = customerEntity.id;
    result.customerNumber = customerEntity.customerNumber;
    result.documentNumber = customerEntity.documentNumber;
    result.firstName = customerEntity.firstName;
    result.lastName = customerEntity.lastName;
    result.email = customerEntity.email;
    result.phone = customerEntity.phone;

    return result;
  }
}
