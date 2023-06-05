import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customerRepository';
import { CustomerMapper } from '../mappers/customerMapper';
import { CustomerResponseDTO } from 'src/customers/dto/customer-resp.dto';

@Injectable()
export class GetAllCustomers {
  private readonly customerMapper: CustomerMapper;

  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {
    this.customerMapper = new CustomerMapper();
  }

  async run(): Promise<CustomerResponseDTO[]> {
    const result = await this.customerRepository.getAll();
    return result.map((customer) =>
      this.customerMapper.mapToCustomerResponseDTO(customer),
    );
  }
}
