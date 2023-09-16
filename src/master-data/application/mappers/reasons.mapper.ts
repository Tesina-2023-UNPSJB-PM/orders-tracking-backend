import { Injectable } from '@nestjs/common';
import { ReasonStatusDTO } from 'src/service-orders/dto/executionHistory/reasonStatus.dto';

@Injectable()
export class MasterDataReasonMapper {
  public mapToReasonResponseDTO({
    id,
    name,
    description,
  }: any): ReasonStatusDTO {
    return { id, name, description } as ReasonStatusDTO;
  }

  public mapToReasonsResponseDTO(entities: any[]): ReasonStatusDTO[] {
    return entities.map((entity) => this.mapToReasonResponseDTO(entity));
  }
}
