import { Entity } from '../../../shared/domain/entities/entity';
import { InvalidDomainException } from '../../../shared/domain/exceptions/invalidDomain.error';
import validator from 'validator';

export interface OrderTypeProps {
  name: string;
  description?: string;
}

export class OrderType extends Entity<OrderTypeProps> {
  private constructor(props: OrderTypeProps) {
    super(props);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  public static createOrderType(props: OrderTypeProps): OrderType {
    if (validator.isEmpty(props.name, { ignore_whitespace: true }))
      throw new InvalidDomainException('Name of type order undefined');

    return new OrderType(props);
  }
}
