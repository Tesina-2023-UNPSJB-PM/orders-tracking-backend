import { OrderLocation } from 'src/service-orders/domain/entities/orderLocation.entity';
import { OrderLocationPersistent } from '../entities/orderLocationPersistent';
import { MapperAddressPersistent } from 'src/shared/infrastructure/mappers/mapperAddressPersistent';

export class MapperOrderLocationPersistent {
  private mapperAddress: MapperAddressPersistent;

  constructor() {
    this.mapperAddress = new MapperAddressPersistent();
  }

  mapToOrderLocation(row: OrderLocationPersistent): OrderLocation {
    return OrderLocation.create(
      {
        address: row.address
          ? this.mapperAddress.mapToAddress(row.address)
          : undefined,
        referenceInfo: row.referenceInfo,
      },
      row.id,
    );
  }
  mapToOrderLocationPersistent(entity: OrderLocation): OrderLocationPersistent {
    const result = new OrderLocationPersistent();
    result.address = entity.address
      ? this.mapperAddress.mapToAddressPersistent(entity.address)
      : undefined;

    return result;
  }
}
