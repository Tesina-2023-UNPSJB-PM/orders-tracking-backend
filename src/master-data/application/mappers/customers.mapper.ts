import { Injectable } from '@nestjs/common';
import { MasterDataCustomerDTO } from 'src/master-data/dto/master-data-customer.dto';

@Injectable()
export class MasterDataCustomerMapper {
  public mapToCustomerResponseDTO({
    customer_number: customerNumber,
    document_number: documentNumber,
    first_name: firstName,
    last_name: lastName,
    business_name: businessName,
    email,
    phones,
    id
  }: any): MasterDataCustomerDTO {
    return {
      id,
      customerNumber,
      documentNumber,
      firstName,
      lastName,
      businessName,
      email,
      phones,
    } as MasterDataCustomerDTO;
  }

  public mapToCustomersResponseDTO(
    customersEntity: any[],
  ): MasterDataCustomerDTO[] {
    return customersEntity.map((customerEntity) =>
      this.mapToCustomerResponseDTO(customerEntity),
    );
  }
}
