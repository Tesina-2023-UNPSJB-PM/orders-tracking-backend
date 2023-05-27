import { ServiceOrder } from '../../../../service-orders/domain/entities/serviceOrder.entity';
import { ServiceOrderRepository } from '../../../../service-orders/domain/repositories/serviceOrderRepository';

export class ServiceOrderPersistence implements ServiceOrderRepository {
  private db: ServiceOrder[] = [];

  async getAll(): Promise<ServiceOrder[]> {
    return this.db;
  }

  getById(id: number): Promise<ServiceOrder | null> {
    throw new Error('Method not implemented.');
  }

  getByServiceOrderNumber(number: string): Promise<ServiceOrder | null> {
    throw new Error('Method not implemented.');
  }

  async save(entity: ServiceOrder): Promise<ServiceOrder> {
    if (!entity) {
      throw new Error('Error al persistir entidad. Entidad nula');
    }

    const entitySaved = ServiceOrder.create(
      entity.getValues(),
      this.db.length + 1,
    );

    this.db.push(entitySaved);

    return entitySaved;
  }

  update(customer: ServiceOrder): Promise<ServiceOrder> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
