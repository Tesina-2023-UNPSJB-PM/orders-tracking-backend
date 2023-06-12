/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GetMasterData } from 'src/master-data/application/useCases/getMasterData';
import { MasterDataResponse } from 'src/master-data/dto/master-data-resp.dto';
import { DataSource } from 'typeorm';

@Controller('/tracking-so/master-data')
export class MasterDataController {
  constructor(
    private readonly _getMasterData: GetMasterData,
    
  ) {}

  @Get()
  getMasterData(): Promise<MasterDataResponse> {
    return this._getMasterData.run();
  }
}
