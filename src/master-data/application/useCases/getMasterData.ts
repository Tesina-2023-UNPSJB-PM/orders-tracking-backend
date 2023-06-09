import { Inject, Injectable } from '@nestjs/common';
import { MasterDataRepository } from 'src/master-data/domain/repositories/masterDataRepository';
import { MasterDataResponse } from 'src/master-data/dto/master-data-resp.dto';

@Injectable()
export class GetMasterData {
  constructor(
    @Inject('MasterDataRepository')
    private masterDataRepository: MasterDataRepository,
  ) {}

  async run(): Promise<MasterDataResponse> {
    return this.masterDataRepository.getMasterData();
  }
}
