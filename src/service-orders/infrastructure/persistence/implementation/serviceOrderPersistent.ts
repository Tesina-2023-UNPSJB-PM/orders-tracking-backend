import { ServiceOrder } from '../../../../service-orders/domain/entities/serviceOrder.entity';
import { ServiceOrderRepository } from '../../../../service-orders/domain/repositories/serviceOrderRepository';

export class ServiceOrderPersistence implements ServiceOrderRepository {
  getAll(): Promise<ServiceOrder[]> {
    throw new Error('Method not implemented.');
  }

  getById(id: number): Promise<ServiceOrder | null> {
    throw new Error('Method not implemented.');
  }

  getByServiceOrderNumber(number: string): Promise<ServiceOrder | null> {
    throw new Error('Method not implemented.');
  }

  save(customer: ServiceOrder): Promise<ServiceOrder> {
    throw new Error('Method not implemented.');
  }

  update(customer: ServiceOrder): Promise<ServiceOrder> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
