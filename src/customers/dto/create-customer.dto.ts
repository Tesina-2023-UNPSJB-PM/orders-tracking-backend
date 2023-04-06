import { Customer } from '../domain/customer.entity';

export class CreateCustomerDto {
  customerNumber: string;
  //Cuit o Cuil
  documentNumer: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  public static mapToCustomer(from: CreateCustomerDto): Customer {
    const result = new Customer();
    result.customerNumber = from.customerNumber;
    result.documentNumer = from.documentNumer;
    result.firstName = from.firstName;
    result.lastName = from.lastName;
    result.phone = from.phone;
    result.email = from.email;

    return result;
  }
}
