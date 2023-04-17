import { CustomerData } from '../infrastructure/persistence/entitiesDB/customerData';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends CreateCustomerDto {
  id: number;

  public static mapToCustomer(from: UpdateCustomerDto): CustomerData {
    const result = new CustomerData();
    result.id = from.id;
    result.customerNumber = from.customerNumber;
    result.documentNumber = from.documentNumber;
    result.firstName = from.firstName;
    result.lastName = from.lastName;
    result.phone = from.phone;
    result.email = from.email;

    return result;
  }
}
