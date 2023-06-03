import { Address } from 'src/shared/domain/entities/address.entity';
import { AddressPersistent } from '../entitiesDB/addressPersistent';

export class MapperAddressPersistent {
  mapToAddress(row: AddressPersistent): Address {
    return Address.create(
      {
        description: row.description,
        city: row.city,
        country: row.country,
        state: row.state,
        zipCode: row.zipCode,
        latitude: row.latitude,
        longitude: row.longitude,
      },
      row.id,
    );
  }
  mapToAddressPersistent(entity: Address): AddressPersistent {
    const result = new AddressPersistent();
    result.description = entity.description;
    result.city = entity.city;
    result.state = entity.state;
    result.country = entity.country;
    result.zipCode = entity.zipCode;
    result.latitude = entity.location.latitude;
    result.longitude = entity.location.longitude;

    return result;
  }
}
