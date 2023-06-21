import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerPersistent } from 'src/customers/infrastructure/persistence/entitiesDB/customerPersistent';

export class MapperCustomerPersistent {

  mapToCustomer({
    address,
    customerNumber,
    documentNumber,
    businessName,
    email,
    firstName,
    id,
    lastName,
    phones,
  }: CustomerPersistent): Customer {
    return Customer.createCustomer(
      {
        address: address ?? {city: '', country: '', description: '', state: ''},
        customerNumber: customerNumber ?? '',
        documentNumber: documentNumber ?? '',
        businessName,
        email,
        firstName,
        lastName,
        phones,
      },
      id,
    );
  }

  mapToCustomerPersistent({
    address,
    customerNumber,
    documentNumber,
    businessName,
    email,
    firstName,
    lastName,
    phones,
    id,
  }: Customer): CustomerPersistent {
    const {
      city,
      country,
      description,
      id: addressId,
      location,
      state,
      zipCode,
    } = address;
    const { latitude, longitude } = location;
    const emailValue = email?.value;
    return {
      address: {
        city,
        country,
        description,
        id: addressId,
        latitude,
        longitude,
        state,
        zipCode,
      },
      email: emailValue,
      customerNumber,
      documentNumber,
      businessName,
      firstName,
      lastName,
      phones,
      id,
    };
  }
}
