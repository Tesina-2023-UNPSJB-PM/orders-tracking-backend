import { Sector } from 'src/service-orders/domain/entities/sector.entity';
import { SectorRepository } from 'src/service-orders/domain/repositories/sectorRepository';

export class SectorPersistent implements SectorRepository {
  private db: Sector[] = [];

  constructor() {
    this.db.push(Sector.create({ name: 'Sector 1' }, 1));
    this.db.push(Sector.create({ name: 'Sector 2' }, 2));
    this.db.push(Sector.create({ name: 'Sector 3' }, 3));
    this.db.push(Sector.create({ name: 'Sector 4' }, 4));
  }

  async getByName(name: string): Promise<Sector | null> {
    const result = this.db.find((row) => row.name === name);

    return result ? result : null;
  }

  async getAll(): Promise<Sector[]> {
    return this.db;
  }

  async getById(id?: number): Promise<Sector | null> {
    const result = this.db.find((row) => row.id === id);

    return result ? result : null;
  }

  save: (entity?: Sector | undefined) => Promise<Sector>;
  update: (entity?: Sector | undefined) => Promise<Sector>;
  delete: (id?: number | undefined) => Promise<void>;
}
