import { Inject } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customerRepository';

export class ExistsCustomerByNumber {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {}

  async run(numberClient: string): Promise<boolean> {
    const customer = await this.customerRepository.getByCustomerNumber(
      numberClient,
    );

    if (customer) return true;

    return false;
  }
}
