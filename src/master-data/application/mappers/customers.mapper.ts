import { Injectable } from '@nestjs/common';
import { MasterDataCustomerDTO } from 'src/master-data/dto/master-data-customer.dto';

@Injectable()
export class MasterDataCustomerMapper {
  public mapToCustomerResponseDTO({
    customer_number: customerNumber,
    document_number: documentNumber,
    first_name: firtsName,
    last_name: lastName,
    business_name: businessName,
    email,
    phones,
  }: any): MasterDataCustomerDTO {
    return {
      customerNumber,
      documentNumber,
      firtsName,
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
