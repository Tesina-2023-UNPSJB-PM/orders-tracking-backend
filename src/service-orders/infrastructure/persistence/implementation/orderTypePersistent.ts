import { OrderTypeRepository } from 'src/service-orders/domain/repositories/orderTypeRepository';
import { OrderType } from 'src/service-orders/domain/entities/order-type.entity';

export class OrderTypePersistent implements OrderTypeRepository {
  private db: OrderType[] = [];

  constructor() {
    this.db.push(
      OrderType.create(
        {
          name: 'Tipo 1',
        },
        1,
      ),
    );

    this.db.push(
      OrderType.create(
        {
          name: 'Tipo 2',
        },
        2,
      ),
    );
  }

  async getByName(name: string): Promise<OrderType | null> {
    const result = this.db.find((row) => row.name === name);
    return result ? result : null;
  }
  async getAll(): Promise<OrderType[]> {
    return this.db;
  }

  async getById(id?: number): Promise<OrderType | null> {
    const result = this.db.find((row) => row.id === id);

    return result ? result : null;
  }
  save: (entity?: OrderType | undefined) => Promise<OrderType>;
  update: (entity?: OrderType | undefined) => Promise<OrderType>;
  delete: (id?: number | undefined) => Promise<void>;
}
