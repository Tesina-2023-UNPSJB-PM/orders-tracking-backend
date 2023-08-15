import { Customer } from '../../../customers/domain/entities/customer.entity';
import { CustomerResponseDTO } from '../../../customers/dto/customer-resp.dto';
import { Address } from '../../../shared/domain/entities/address.entity';
import { AddressDTO } from '../../../shared/dto/address.dto';

export class CustomerMapper {
  public mapToCustomerResponseDTO(
    customerEntity: Customer,
  ): CustomerResponseDTO {
    const result = new CustomerResponseDTO();
    result.id = customerEntity.id;
    result.customerNumber = customerEntity.customerNumber;
    result.documentNumber = customerEntity.documentNumber;
    result.firstName = customerEntity.firstName;
    result.lastName = customerEntity.lastName;
    result.email = customerEntity.email?.value;
    result.phones = customerEntity.phones;
    result.address = this.getAddressDTOOf(customerEntity.address);

    return result;
  }

  private getAddressDTOOf(address: Address): AddressDTO {
    const result = new AddressDTO();
    result.id = address.id;
    result.description = address.description;
    result.city = address.city;
    result.country = address.country;
    result.state = address.state;
    result.zipCode = address.zipCode;
    result.latitude = address.location.latitude;
    result.longitude = address.location.longitude;
    return result;
  }
}
