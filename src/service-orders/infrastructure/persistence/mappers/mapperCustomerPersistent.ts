import { OrderExecution } from 'src/service-orders/domain/entities/orderExecution.entity';
import { OrderExecutionPersistent } from '../entities/orderExecutionPersistent';
import { MapperEmployeePersistent } from './mapperEmployePersistent';
import { MapperSectorPersistent } from './mapperSectorPersistent';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerPersistent } from 'src/customers/infrastructure/persistence/entitiesDB/customerPersistent';
import { AddressPersistent } from 'src/shared/infrastructure/entitiesDB/addressPersistent';
import { Injectable } from '@nestjs/common';

export class MapperCustomerPersistent {
  private mapperEmployee: MapperEmployeePersistent;
  private mapperSector: MapperSectorPersistent;

  constructor() {
    this.mapperEmployee = new MapperEmployeePersistent();
    this.mapperSector = new MapperSectorPersistent();
  }
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
        address,
        customerNumber,
        documentNumber,
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
