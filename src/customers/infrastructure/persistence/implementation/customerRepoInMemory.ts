import { Injectable } from '@nestjs/common';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerRepository } from '../../../domain/repositories/customerRepository';

@Injectable()
export class CustomerRepoInMemory implements CustomerRepository {
  private readonly customersDb: Customer[] = [];

  public async getAll(): Promise<Customer[]> {
    return this.customersDb;
  }

  public async save(customer: Customer): Promise<Customer> {
    const newId = this.customersDb.length + 1;
    const customerWithId = Customer.createCustomer(
      {
        customerNumber: customer.customerNumber,
        documentNumber: customer.documentNumber,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email?.value,
        phones: customer.phones,
        address: customer.address,
      },
      newId,
    );

    this.customersDb.push(customerWithId);

    return customerWithId;
  }

  public async getById(id: number): Promise<Customer | null> {
    const result = this.customersDb.find((customer) => customer.id === id);
    return result || null;
  }

  public async getByCustomerNumber(
    customerNumber: string,
  ): Promise<Customer | null> {
    const result = this.customersDb.find(
      (customer) => customer.customerNumber === customerNumber,
    );

    return result || null;
  }

  async update(customer: Customer): Promise<Customer> {
    throw new Error('Method not implemented');
  }

  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented');
  }
}
