import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerRepository } from '../../../domain/repositories/customerRepository';
import { CustomerPersistent } from '../entitiesDB/customerPersistent';
import { Repository } from 'typeorm';
import { CustomerPersistentMapper } from '../../mappers/customerPersistentMapper';
import { Logger } from '@nestjs/common';

export class CustomerRepositoryPersistent implements CustomerRepository {
  readonly LOGGER = new Logger('CustomerRepositoryPersistent');
  mapper: CustomerPersistentMapper;

  constructor(
    @InjectRepository(CustomerPersistent)
    private customerRepository: Repository<CustomerPersistent>,
  ) {
    this.mapper = new CustomerPersistentMapper();
  }

  async save(customer: Customer): Promise<Customer> {
    const customerToSave = this.mapper.getCustomerPersistentOf(customer);
    const savedCustomer = await this.customerRepository.save(customerToSave);
    return this.mapper.getCustomerOf(savedCustomer);
  }

  async getAll(): Promise<Customer[]> {
    return (await this.customerRepository.find()).map((row) =>
      this.mapper.getCustomerOf(row),
    );
  }
  async getById(id: number): Promise<Customer | null> {
    const resultQuery = await this.customerRepository.findOneBy({ id });

    return resultQuery ? this.mapper.getCustomerOf(resultQuery) : null;
  }

  async getByCustomerNumber(customerNumber: string): Promise<Customer | null> {
    const resultQuery = await this.customerRepository.findOneBy({
      customerNumber,
    });

    return resultQuery ? this.mapper.getCustomerOf(resultQuery) : null;
  }

  async update(customer: Customer): Promise<Customer> {
    return await this.save(customer);
  }

  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
