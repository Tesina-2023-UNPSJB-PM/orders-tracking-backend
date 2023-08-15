import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { GetEmployeeByUsername } from 'src/master-data/application/useCases/getEmployeeByUsername';
import { GetMasterData } from 'src/master-data/application/useCases/getMasterData';
import { MasterDataEmployeeDTO } from 'src/master-data/dto/master-data-employee.dto';
import { MasterDataResponse } from 'src/master-data/dto/master-data-resp.dto';

@Controller('/tracking-so/master-data')
export class MasterDataController {
  constructor(
    private readonly _getMasterData: GetMasterData,
    private readonly _getEmployeeByUsername: GetEmployeeByUsername,
  ) {}

  @Get()
  getMasterData(): Promise<MasterDataResponse> {
    return this._getMasterData.run();
  }

  @Get('/employee/:username')
  async getEmployeeByUsername(
    @Param('username') username: string,
  ): Promise<MasterDataEmployeeDTO | null> {
    const result = await this._getEmployeeByUsername.run(username);
    if (!result)
      throw new NotFoundException(
        `Employee with username ${username} not found`,
      );

    return result;
  }
}
