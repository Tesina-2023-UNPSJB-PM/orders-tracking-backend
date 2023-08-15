import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/customers/domain/repositories/customerRepository';

@Injectable()
export class DeleteCustomer {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {}

  async run(id: number): Promise<void> {
    this.customerRepository.delete(id);
  }
}
