import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './domain/customer.entity';
import { DB_CUSTOMERS } from './dbCustomers.const';

@Injectable()
export class CustomersService {
  private dbCustomers: Customer[] = [];

  constructor() {
    this.dbCustomers = DB_CUSTOMERS;
  }

  create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = CreateCustomerDto.mapToCustomer(createCustomerDto);
    newCustomer.id = this.dbCustomers.length + 1;
    this.dbCustomers.push(newCustomer);
    return newCustomer;
  }

  findAll() {
    return this.dbCustomers;
  }

  findOne(id: number) {
    return this.dbCustomers.find((item) => item.id === id);
  }

  update(updateCustomerDto: UpdateCustomerDto): boolean {
    let updatedCustomer = false;
    this.dbCustomers.forEach((item, index, customers) => {
      if (item.id === updateCustomerDto.id) {
        customers[index] = UpdateCustomerDto.mapToCustomer(updateCustomerDto);
        updatedCustomer = true;
      }
    });

    return updatedCustomer;
  }

  remove(id: number) {
    this.dbCustomers = this.dbCustomers.filter((item) => item.id !== id);
    return true;
  }
}
