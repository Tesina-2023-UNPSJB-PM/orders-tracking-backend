import { OrderType } from 'src/service-orders/domain/entities/orderType.entity';
import { OrderTypePersistent } from '../entities/orderTypePersistent';

export class MapperOrderTypePersistent {
  mapToOrderType(row: OrderTypePersistent): OrderType {
    return OrderType.create(
      {
        name: row.name ?? '',
        description: row.description,
      },
      row.id,
    );
  }
  mapToOrderTypePersistent(entity: OrderType): OrderTypePersistent {
    const result = new OrderTypePersistent();
    result.id = entity.id;
    result.name = entity.name;
    result.description = entity.description;

    return result;
  }
}
