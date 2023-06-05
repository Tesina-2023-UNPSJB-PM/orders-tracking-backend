import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/customers/domain/repositories/customerRepository';
import { CustomerResponseDTO } from 'src/customers/dto/customer-resp.dto';
import { CustomerMapper } from '../mappers/customerMapper';

@Injectable()
export class GetCustomerById {
  private mapper: CustomerMapper;
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {
    this.mapper = new CustomerMapper();
  }

  async run(id?: number): Promise<CustomerResponseDTO | null> {
    if (!id) {
      return null;
    }
    const result = await this.customerRepository.getById(id);
    if (!result) return null;

    return this.mapper.mapToCustomerResponseDTO(result);
  }
}
