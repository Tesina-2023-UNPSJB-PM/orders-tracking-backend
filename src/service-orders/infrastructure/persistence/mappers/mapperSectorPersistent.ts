import { Sector } from 'src/service-orders/domain/entities/sector.entity';
import { SectorPersistent } from '../entities/sectorPersistent';

export class MapperSectorPersistent {
  mapToSector(row: SectorPersistent): Sector {
    return Sector.create(
      {
        name: row.name,
        description: row.description,
      },
      row.id,
    );
  }

  mapToSectorPersistent(entity: Sector): SectorPersistent {
    const result = new SectorPersistent();
    result.id = entity.id;
    result.name = entity.name;
    result.description = entity.description;

    return result;
  }
}
