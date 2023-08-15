import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('UserService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test1', () => {
    expect(service.findAll().length).toBe(3);
  });
});
