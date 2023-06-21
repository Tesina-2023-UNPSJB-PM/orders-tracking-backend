import { Customer } from '../../../customers/domain/entities/customer.entity';
import {
  Address,
  AddressValues,
} from '../../../shared/domain/entities/address.entity';
import { AddressPersistent } from '../../../shared/infrastructure/entitiesDB/addressPersistent';
import { CustomerPersistent } from '../persistence/entitiesDB/customerPersistent';

export class CustomerPersistentMapper {
  public getCustomerPersistentOf(customer: Customer): CustomerPersistent {
    const result = new CustomerPersistent();
    result.id = customer.id;
    result.customerNumber = customer.customerNumber;
    result.documentNumber = customer.documentNumber;
    result.firstName = customer.firstName;
    result.lastName = customer.lastName;
    result.businessName = customer.businessName;
    result.email = customer.email?.value;
    result.phones = customer.phones;
    result.address = this.getAddressPersistentOf(customer.address);
    return result;
  }

  private getAddressPersistentOf(address: Address): AddressPersistent {
    const result = new AddressPersistent();
    result.id = address.id;
    result.description = address.description;
    result.city = address.city;
    result.state = address.state;
    result.country = address.country;
    result.zipCode = address.zipCode;
    result.latitude = address.location.latitude;
    result.longitude = address.location.longitude;
    return result;
  }

  public getCustomerOf(data: CustomerPersistent): Customer {
    return Customer.createCustomer(
      {
        customerNumber: data.customerNumber ?? '',
        documentNumber: data.documentNumber ?? '',
        firstName: data.firstName,
        lastName: data.lastName,
        businessName: data.businessName,
        email: data.email,
        phones: data.phones,
        address: this.getAddressValuesOf(data.address ?? {city: '', country: '', description: '', state: '', latitude: 0, longitude: 0}),
      },
      data.id,
    );
  }

  private getAddressValuesOf(address: AddressPersistent): AddressValues {
    // TODO: Modificar este mapeo
    return {
      id: address.id,
      description: address.description,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
      latitude: address.latitude,
      longitude: address.longitude,
    } as AddressValues;
  }
}
