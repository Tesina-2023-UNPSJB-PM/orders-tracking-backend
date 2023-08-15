import { MasterDataEmployeeDTO } from 'src/master-data/dto/master-data-employee.dto';
import { MasterDataResponse } from 'src/master-data/dto/master-data-resp.dto';

export interface MasterDataRepository {
  getMasterData: () => Promise<MasterDataResponse>;
  getEmployeeByUsername: (
    username: string,
  ) => Promise<MasterDataEmployeeDTO | null>;
}
