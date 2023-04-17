import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  getAll: () => Promise<Customer[]>;
  getById: (id: number) => Promise<Customer | undefined>;
  getByCustomerNumber: (
    customerNumber: string,
  ) => Promise<Customer | undefined>;
  save: (customer: Customer) => Promise<Customer>;
  update: (customer: Customer) => Promise<Customer>;
  delete: (customer: Customer) => Promise<void>;
}
