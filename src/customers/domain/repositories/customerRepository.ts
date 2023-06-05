import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  getAll: () => Promise<Customer[]>;
  getById: (id: number) => Promise<Customer | null>;
  getByCustomerNumber: (customerNumber: string) => Promise<Customer | null>;
  save: (customer: Customer) => Promise<Customer>;
  update: (customer: Customer) => Promise<Customer>;
  delete: (id: number) => Promise<void>;
}
