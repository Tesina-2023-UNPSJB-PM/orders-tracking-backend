import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { Entity } from '../../../shared/domain/entities/entity';

interface WorkerProps {
  recordNumber: string;
  firstName: string;
  lastName: string;
}

export class Worker extends Entity<WorkerProps> {
  constructor(props: WorkerProps, id?: number) {
    super(props, id);
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

  public static createWorker(values: WorkerProps, id?: number): Worker {
    if (!values.recordNumber)
      throw new InvalidDomainException('Record number of worker undefined');

    if (!values.firstName || !values.lastName)
      throw new InvalidDomainException('Name of worker undefined');

    return new Worker(values, id);
  }
}
