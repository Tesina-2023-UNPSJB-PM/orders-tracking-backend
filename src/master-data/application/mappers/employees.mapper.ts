import { Injectable } from '@nestjs/common';
import { MasterDataEmployeeDTO } from 'src/master-data/dto/master-data-employee.dto';

@Injectable()
export class MasterDataEmployeesMapper {
  public mapToEmployeeResponseDTO(employeeEntity: any): MasterDataEmployeeDTO {
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      record_number: recordNumber,
    } = employeeEntity;

    return {
      id,
      firstName,
      lastName,
      recordNumber,
    } as MasterDataEmployeeDTO;
  }

  public mapToEmployeesResponseDTO(
    employeesEntity: any[],
  ): MasterDataEmployeeDTO[] {
    return employeesEntity.map((employeeEntity) =>
      this.mapToEmployeeResponseDTO(employeeEntity),
    );
  }
}
