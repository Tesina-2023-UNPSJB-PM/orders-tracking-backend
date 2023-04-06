import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrdersService } from '../../src/service-orders/service-orders.service';
import { CustomersModule } from '../../src/customers/customers.module';
import { UsersModule } from '../../src/users/users.module';
import { UsersService } from '../../src/users/users.service';

describe('ServiceOrdersService', () => {
  let service: ServiceOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceOrdersService, UsersService],
      imports: [CustomersModule, UsersModule],
    }).compile();

    service = module.get<ServiceOrdersService>(ServiceOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
