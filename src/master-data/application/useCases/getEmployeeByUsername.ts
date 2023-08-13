import { Inject, Injectable } from '@nestjs/common';
import { MasterDataRepository } from 'src/master-data/domain/repositories/masterDataRepository';
import { MasterDataEmployeeDTO } from 'src/master-data/dto/master-data-employee.dto';

@Injectable()
export class GetEmployeeByUsername {
  constructor(
    @Inject('MasterDataRepository')
    private masterDataRepository: MasterDataRepository,
  ) {}

  async run(username: string): Promise<MasterDataEmployeeDTO | null> {
    return this.masterDataRepository.getEmployeeByUsername(username);
  }
}
