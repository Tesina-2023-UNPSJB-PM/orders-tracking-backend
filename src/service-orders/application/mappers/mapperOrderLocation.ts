import { OrderLocation } from 'src/service-orders/domain/entities/orderLocation.entity';
import { OrderLocationDTO } from 'src/service-orders/dto/orderLocation.dto';
import { Address } from 'src/shared/domain/entities/address.entity';
import { AddressDTO } from 'src/shared/dto/address.dto';

export class MapperOrderLocation {
  mapFromDTOToEntity(from: OrderLocationDTO): OrderLocation {
    let address;
    if (from.address) {
      address = Address.create(from.address, from.address.id);
    }

    return OrderLocation.create({
      address: address,
      referenceInfo: from.referenceInfo,
    });
  }

  mapFromDtoToEntity(
    from: OrderLocationDTO,
    optionalAddress?: AddressDTO,
  ): OrderLocation {
    if (!from.address) {
      from.address = optionalAddress;
    }
    return this.mapFromDTOToEntity(from);
  }
}
