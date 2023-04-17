import { Entity } from '../../../shared/domain/entities/entity';

export interface CustomerProps {
  customerNumber: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
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

  public get firstName(): string {
    return this.props.firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public get email(): string | undefined {
    return this.props.email;
  }

  public get phone(): string | undefined {
    return this.props.phone;
  }

  public static createCustomer(props: CustomerProps, id?: number): Customer {
    return new Customer(props, id);
  }
}
