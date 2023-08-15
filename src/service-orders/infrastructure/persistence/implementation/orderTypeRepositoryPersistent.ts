import { Injectable } from '@nestjs/common';
import { OrderTypeRepository } from 'src/service-orders/domain/repositories/orderTypeRepository';
import { OrderType } from 'src/service-orders/domain/entities/orderType.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTypePersistent } from '../entities/orderTypePersistent';
import { Repository } from 'typeorm';

@Injectable()
export class OrderTypeRepositoryPersistent implements OrderTypeRepository {
  constructor(
    @InjectRepository(OrderTypePersistent)
    private repository: Repository<OrderTypePersistent>,
  ) {}

  async getByName(name: string): Promise<OrderType | null> {
    const resultDB = await this.repository.findOneBy({ name });
    return resultDB ? this.mapToOrderType(resultDB) : null;
  }

  async getAll(): Promise<OrderType[]> {
    return (await this.repository.find()).map((row) =>
      this.mapToOrderType(row),
    );
  }

  async getById(id?: number): Promise<OrderType | null> {
    const resultDB = await this.repository.findOneBy({ id });

    return resultDB ? this.mapToOrderType(resultDB) : null;
  }
  save: (entity?: OrderType | undefined) => Promise<number>;
  update: (entity?: OrderType | undefined) => Promise<void>;
  delete: (id?: number | undefined) => Promise<void>;

  private mapToOrderType(row: OrderTypePersistent): OrderType {
    return OrderType.create(
      {
        name: row.name || '',
        description: row.description,
      },
      row.id,
    );
  }
}
