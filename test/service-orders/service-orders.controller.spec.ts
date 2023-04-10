import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrdersController } from '../../src/service-orders/infrastructure/service-orders.controller';
import { ServiceOrdersService } from '../../src/service-orders/application/service-orders.service';
import { CustomersModule } from '../../src/customers/customers.module';
import { UsersService } from '../../src/users/users.service';
import { UsersModule } from '../../src/users/users.module';

describe('ServiceOrdersController', () => {
  let controller: ServiceOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOrdersController],
      providers: [ServiceOrdersService, UsersService],
      imports: [CustomersModule, UsersModule],
    }).compile();

    controller = module.get<ServiceOrdersController>(ServiceOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
