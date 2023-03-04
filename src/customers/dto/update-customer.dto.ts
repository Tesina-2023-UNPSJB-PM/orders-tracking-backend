import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends CreateCustomerDto {
  id: number;

  public static mapToCustomer(from: UpdateCustomerDto): Customer {
    const result = new Customer();
    result.id = from.id;
    result.customerNumber = from.customerNumber;
    result.documentNumer = from.documentNumer;
    result.firstName = from.firstName;
    result.lastName = from.lastName;
    result.phone = from.phone;
    result.email = from.email;

    return result;
  }
}
