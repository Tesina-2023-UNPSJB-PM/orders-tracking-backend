import { CrudRepository } from '../../../shared/domain/repositories/crudRepository';
import { Sector } from '../entities/sector.entity';

export interface SectorRepository extends CrudRepository<Sector> {
  getByName: (name: string) => Promise<Sector | null>;
}
