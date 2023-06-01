import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from 'src/service-orders/domain/entities/sector.entity';
import { SectorRepository } from 'src/service-orders/domain/repositories/sectorRepository';
import { Repository } from 'typeorm';
import { SectorPersistent } from '../entities/sectorPersistent';

@Injectable()
export class SectorRepositoryPersistent implements SectorRepository {
  constructor(
    @InjectRepository(SectorPersistent)
    private repository: Repository<SectorPersistent>,
  ) {}

  async getByName(name: string): Promise<Sector | null> {
    const resultDB = await this.repository.findOneBy({ name });

    return resultDB ? this.mapToSector(resultDB) : null;
  }

  async getAll(): Promise<Sector[]> {
    return (await this.repository.find()).map((row) => this.mapToSector(row));
  }

  async getById(id?: number): Promise<Sector | null> {
    const resultDB = await this.repository.findOneBy({ id });

    return resultDB ? this.mapToSector(resultDB) : null;
  }

  save: (entity?: Sector | undefined) => Promise<Sector>;
  update: (entity?: Sector | undefined) => Promise<Sector>;
  delete: (id?: number | undefined) => Promise<void>;

  private mapToSector(row: SectorPersistent): Sector {
    return Sector.create(
      {
        name: row.name,
        description: row.description,
      },
      row.id,
    );
  }
}
