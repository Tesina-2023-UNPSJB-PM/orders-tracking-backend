import { Entity } from '../../../shared/domain/entities/entity';
import { Address } from '../../../shared/domain/entities/address.entity';

export interface OrderLocationProps {
  address?: Address;
  referenceInfo?: string;
}

export class OrderLocation extends Entity<OrderLocationProps> {
  private constructor(props: OrderLocationProps, id?: number) {
    super(props, id);
  }

  get id(): number {
    return this._id;
  }

  get address(): Address | undefined {
    return this.props.address;
  }

  get referenceInfo(): string | undefined {
    return this.props.referenceInfo;
  }

  public static create(props: OrderLocationProps, id?: number) {
    return new OrderLocation(props, id);
  }
}
