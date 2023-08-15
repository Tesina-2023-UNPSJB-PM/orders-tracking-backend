import { Entity } from '../../../shared/domain/entities/entity';
import { Employee } from './employee.entity';
import { Sector } from './sector.entity';
import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';

export interface OrderExecutionProps {
  observations?: string;
  executor?: Employee;
  assignedSector?: Sector;
  assignedTime?: Date;
  estimatedResolutionTime?: Date;
  resolutionTime?: Date;
}

export class OrderExecution extends Entity<OrderExecutionProps> {
  private constructor(props: OrderExecutionProps, id?: number) {
    super(props, id);
  }

  get id(): number {
    return this._id;
  }

  get observations(): string | undefined {
    return this.props.observations;
  }

  get executor(): Employee | undefined {
    return this.props.executor;
  }

  get assignedSector(): Sector | undefined {
    return this.props.assignedSector;
  }

  get assignedTime(): Date | undefined {
    return this.props.assignedTime;
  }

  get estimatedResolutionTime(): Date | undefined {
    return this.props.estimatedResolutionTime;
  }

  get resolutionTime(): Date | undefined {
    return this.props.resolutionTime;
  }

  public static create(
    values: OrderExecutionProps,
    id?: number,
  ): OrderExecution {
    this.validateSector(values);
    return new OrderExecution(values, id);
  }

  private static validateSector(props: OrderExecutionProps) {
    if (!props.assignedSector) {
      throw new InvalidDomainException(
        'The order has not been assigned to any sector',
      );
    }
  }
}
