import { Injectable } from '@nestjs/common';
import { CustomersService } from '../../customers/customers.service';
import { UsersService } from '../../users/users.service';
import { CreateServiceOrderDto } from '../dto/create-service-order.dto';
import { UpdateServiceOrderDto } from '../dto/update-service-order.dto';
import { OrderType } from '../domain/order-type.entity';
import { ServiceOrder } from '../domain/service-order.entity';
import { DB_TYPES } from '../db/order-types-db.const';
import { DB_ORDERS } from '../db/orders-db.const';
import { OrderEnumsUtils } from '../domain/enums/service-order-enums';
import { OrderLocation } from '../domain/order-location.entity';
import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';
@Injectable()
export class ServiceOrdersService {
  // Futuras tablas de la BD
  private dbOrders: ServiceOrder[] = [];
  private dbTypes: OrderType[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly customerService: CustomersService,
  ) {
    this.initDbTypes();
    this.initDbOrders();
  }

  create(createServiceOrderDto: CreateServiceOrderDto) {
    const newOrder = CreateServiceOrderDto.mapToServiceOrder(
      createServiceOrderDto,
    );

    newOrder.id = this.dbOrders.length + 1;

    const userFound = this.userService.findOne(
      createServiceOrderDto.assignedUserId,
    );
    newOrder.assignedUser = userFound;

    const customerFound = this.customerService.findOne(
      createServiceOrderDto.customerId,
    );

    newOrder.customer = customerFound;

    this.dbOrders.push(newOrder);

    return newOrder;
  }

  findAll(filters: FindAllServiceOrderFilters = {}) {
    return this.dbOrders;
  }

  findOne(numberOrder: string) {
    return this.dbOrders.find((order) => order.number === numberOrder);
  }

  update(updateServiceOrderDto: UpdateServiceOrderDto): boolean {
    let updatedOrder = false;
    this.dbOrders.forEach((order, index, orders) => {
      if (order.id === updateServiceOrderDto.id) {
        orders[index] = UpdateServiceOrderDto.mapToServiceOrder(
          updateServiceOrderDto,
        );
        updatedOrder = true;
      }
      return order;
    });
    return updatedOrder;
  }

  remove(id: number) {
    this.dbOrders = this.dbOrders.filter((order) => order.id !== id);
    return true;
  }

  private initDbTypes() {
    this.dbTypes = DB_TYPES;
  }

  private initDbOrders() {
    DB_ORDERS.forEach((item) => {
      const newOrder = this.getNewServiceOrder(item);
      this.dbOrders.push(newOrder);
    });
  }

  private getNewServiceOrder(item: any): ServiceOrder {
    const result = new ServiceOrder();
    result.id = this.dbOrders.length + 1;
    result.number = item.number;
    result.description = item.description;
    result.observations = item.observations;
    result.type =
      this.dbTypes.find((i) => i.id === item.type) || this.dbTypes[0];
    result.status = OrderEnumsUtils.getOrderStatus(item.status);
    result.priority = OrderEnumsUtils.getOrderPriority(item.priority);
    result.assignedUser = this.userService.findOne(item.assignedUser);
    result.destination = item.destination as OrderLocation;
    result.creationTime = new Date(item.creationTime);
    result.assignedTime = item.assignedTime && new Date(item.assignedTime);
    result.estimatedResolutionTime = new Date(item.estimatedResolutionTime);
    result.resolutionTime = new Date(item.resolutionTimeout);
    result.customer = this.customerService.findOne(item.customer);
    result.serviceDetail = item.serviceDetail;

    return result;
  }
}

export interface FindAllServiceOrderFilters {
  employeeId?: string;
  customerId?: string;
  statusCode?: OrderStatus;
  creationDate?: Date;
}
