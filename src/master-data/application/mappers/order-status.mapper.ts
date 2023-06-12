import { Injectable } from '@nestjs/common';
import { MasterDataOrderStatusDTO } from 'src/master-data/dto/master-data-order-status.dto';

@Injectable()
export class MasterDataStatesMapper {
  public mapToStatusResponseDTO(status: any): MasterDataOrderStatusDTO {
    return {
      code: status,
    } as MasterDataOrderStatusDTO;
  }

  public mapToStatesResponseDTO(
    states: any[],
  ): MasterDataOrderStatusDTO[] {
    return states.map((status) =>
      this.mapToStatusResponseDTO(status),
    );
  }
}
