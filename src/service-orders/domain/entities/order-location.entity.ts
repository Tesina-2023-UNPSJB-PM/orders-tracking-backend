import { Entity } from '../../../shared/domain/entities/entity';
import { Address } from '../../../shared/domain/entities/address.entity';
export interface OrderLocationProps {
  address: Address;
  referenceInfo?: string;
}

export class OrderLocation extends Entity<OrderLocationProps> {
  private constructor(props: OrderLocationProps, id?: number) {
    super(props, id);
  }

  getValues(): OrderLocationProps {
    return this.props;
  }

  get address(): Address {
    return this.props.address;
  }

  public static createOrderLocation(props: OrderLocationProps, id?: number) {
    return new OrderLocation(props, id);
  }
}
