import { Email } from '../../../shared/domain/valueObjects/email.vo';
import { Entity } from '../../../shared/domain/entities/entity';
import {
  Address,
  AddressValues,
} from '../../../shared/domain/entities/address.entity';
import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';
import validator from 'validator';

export interface CustomersValues {
  customerNumber: string;
  documentNumber: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  email?: string;
  phones?: string[];
  address: AddressValues;
}
interface CustomerProps {
  customerNumber: string;
  documentNumber: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  email?: Email;
  phones?: string[];
  adress: Address;
}

export class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: number) {
    super(props, id);
  }

  public get id() {
    return this._id;
  }

  public get customerNumber(): string {
    return this.props.customerNumber;
  }

  public get documentNumber(): string {
    return this.props.documentNumber;
  }

  public get firstName(): string | undefined {
    return this.props.firstName;
  }

  public get lastName(): string | undefined {
    return this.props.lastName;
  }

  public get businessName(): string | undefined {
    return this.props.businessName;
  }

  public get email(): Email | undefined {
    return this.props.email;
  }

  public get phones(): string[] | undefined {
    return this.props.phones;
  }

  public get address(): Address {
    return this.props.adress;
  }

  public static createCustomer(values: CustomersValues, id?: number): Customer {
    Customer.validateDataBasicOfCustomer(values);

    const email = values.email ? new Email({ value: values.email }) : undefined;
    const address = Address.create(values.address, values.address.id);
    return new Customer(
      {
        customerNumber: values.customerNumber,
        documentNumber: values.documentNumber,
        firstName: values.firstName,
        lastName: values.lastName,
        businessName: values.businessName,
        email: email,
        phones: values.phones,
        adress: address,
      },
      id,
    );
  }

  private static validateDataBasicOfCustomer(values: CustomersValues) {
    Customer.validateCustomerNumber(values);

    Customer.validateDocumentNumber(values);

    Customer.validateCustomerNaming(values);
  }

  private static isValueEmpty(value: string) {
    return validator.isEmpty(value, { ignore_whitespace: true });
  }

  private static validateCustomerNaming(values: CustomersValues) {
    const isBlankFirstName =
      !values.firstName || Customer.isValueEmpty(values.firstName);

    const isBlankLastName =
      !values.lastName || Customer.isValueEmpty(values.lastName);

    const isBlankBusinessName =
      !values.businessName || Customer.isValueEmpty(values.businessName);

    if (isBlankFirstName && isBlankLastName && isBlankBusinessName)
      throw new InvalidDomainException(
        'Customer naming undefined <Firstname | Lastname |BusinessName>',
      );
  }

  private static validateDocumentNumber(values: CustomersValues) {
    if (!values.documentNumber || Customer.isValueEmpty(values.documentNumber))
      throw new InvalidDomainException('Document number undefined');
  }

  private static validateCustomerNumber(values: CustomersValues) {
    if (!values.customerNumber || Customer.isValueEmpty(values.customerNumber))
      throw new InvalidDomainException('Customer number undefined');
  }
}
