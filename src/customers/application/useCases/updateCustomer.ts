import { Inject } from '@nestjs/common';
import { CustomerRequestDTO } from '../../../customers/dto/customer-req.dto';
import { CustomerRepository } from '../../../customers/domain/repositories/customerRepository';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';
import { ExistsCustomerByNumber } from '../../../customers/domain/services/existsCustomerByNumber';
import { NonExistentCustomer } from 'src/customers/domain/exceptions/nonExistentCustomer';
import { CustomerMapper } from '../mappers/customerMapper';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export class UpdateCustomer {
  private readonly existsCustomerByNumber: ExistsCustomerByNumber;
  private readonly mapper: CustomerMapper;
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {
    this.existsCustomerByNumber = new ExistsCustomerByNumber(
      customerRepository,
    );
    this.mapper = new CustomerMapper();
  }

  async run(customerDTO: CustomerRequestDTO): Promise<CustomerResponseDTO> {
    const existCustomer = await this.existsCustomerByNumber.run(
      customerDTO.customerNumber,
    );

    if (!existCustomer)
      throw new NonExistentCustomer(customerDTO.customerNumber);

    const customer = Customer.createCustomer({ ...customerDTO });
    const customerUpdated = await this.customerRepository.update(customer);

    return this.mapper.mapToCustomerResponseDTO(customerUpdated);
  }
}
