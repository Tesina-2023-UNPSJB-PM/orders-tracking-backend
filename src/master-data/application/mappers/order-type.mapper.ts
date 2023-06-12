import { Injectable } from '@nestjs/common';
import { MasterDataOrderTypeDTO } from 'src/master-data/dto/master-data-order-type.dto';

@Injectable()
export class MasterDataOrderTypeMapper {
  public mapToOrderTypeResponseDTO(orderTypeEntity: any): MasterDataOrderTypeDTO {
    return {
      ...orderTypeEntity
    } as MasterDataOrderTypeDTO;
  }

  public mapToOrderTypesResponseDTO(
    orderTypes: any[],
  ): MasterDataOrderTypeDTO[] {
    return orderTypes.map((orderTypes) =>
      this.mapToOrderTypeResponseDTO(orderTypes),
    );
  }
}