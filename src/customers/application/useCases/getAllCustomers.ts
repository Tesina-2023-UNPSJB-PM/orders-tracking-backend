import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customerRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAllCustomers {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {}

  async run(): Promise<Customer[]> {
    return this.customerRepository.getAll();
  }
}
