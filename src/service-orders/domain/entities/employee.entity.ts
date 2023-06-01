import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { Entity } from '../../../shared/domain/entities/entity';

interface EmployeeProps {
  recordNumber: string;
  firstName: string;
  lastName: string;
  sectorId: number;
}

export class Employee extends Entity<EmployeeProps> {
  constructor(props: EmployeeProps, id?: number) {
    super(props, id);
  }

  get id(): number {
    return this._id;
  }

  get recordNumber(): string {
    return this.props.recordNumber;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get sectorId(): number {
    return this.props.sectorId;
  }

  public static create(values: EmployeeProps, id?: number): Employee {
    if (!values.recordNumber)
      throw new InvalidDomainException('Record number of employee undefined');

    if (!values.firstName || !values.lastName)
      throw new InvalidDomainException('Name of employee undefined');

    return new Employee(values, id);
  }
}
