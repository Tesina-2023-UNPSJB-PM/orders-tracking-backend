import { MasterDataResponse } from "src/master-data/dto/master-data-resp.dto";

export interface MasterDataRepository {
    getMasterData: () => Promise<MasterDataResponse>;
}