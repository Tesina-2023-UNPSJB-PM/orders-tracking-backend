import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { log } from 'console';
import { CustomerPersistent } from 'src/customers/infrastructure/persistence/entitiesDB/customerPersistent';
import { MasterDataCustomerMapper } from 'src/master-data/application/mappers/customers.mapper';
import { MasterDataEmployeesMapper } from 'src/master-data/application/mappers/employees.mapper';
import { MasterDataOrderTypeMapper } from 'src/master-data/application/mappers/order-type.mapper';
import { MasterDataRepository } from 'src/master-data/domain/repositories/masterDataRepository';
import { MasterDataCustomerDTO } from 'src/master-data/dto/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/master-data/dto/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/master-data/dto/master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from 'src/master-data/dto/master-data-order-type.dto';
import { MasterDataResponse } from 'src/master-data/dto/master-data-resp.dto';
import { OrderStates } from 'src/service-orders/domain/enums/service-order-enums';
import { EmployeePersistent } from 'src/service-orders/infrastructure/persistence/entities/employeePersistent';
import { OrderTypePersistent } from 'src/service-orders/infrastructure/persistence/entities/orderTypePersistent';
import { DataSource } from 'typeorm';

@Injectable()
export class MasterDataRepositoryPersistent implements MasterDataRepository {
  readonly LOGGER = new Logger('MasterDataRepositoryPersistent');

  constructor(
    private masterDataCustomerMapper: MasterDataCustomerMapper,
    private masterDataEmployeesMapper: MasterDataEmployeesMapper,
    private masterDataOrderTypeMapper: MasterDataOrderTypeMapper,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**
   * This method returns all master data.
   *
   * @return {*}  {Promise<MasterDataResponse>}
   * @memberof MasterDataRepositoryPersistent
   */
  async getMasterData(): Promise<MasterDataResponse> {
    return Promise.all([
      this.getServiceOrderStates(),
      this.getServiceOrderTypes(),
      this.getCustomers(),
      this.getEmployees(),
    ]).then(
      ([serviceOrderStates, serviceOrderTypes, customers, employees]) => ({
        serviceOrderStates,
        serviceOrderTypes,
        customers,
        employees,
      }),
    );
  }

  private getCustomers(): Promise<MasterDataCustomerDTO[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(CustomerPersistent, 'customers')
      .getRawMany()
      .then((customers) =>
        this.masterDataCustomerMapper.mapToCustomersResponseDTO(customers),
      );
  }

  private getEmployees(): Promise<MasterDataEmployeeDTO[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(EmployeePersistent, 'employees')
      .getRawMany()
      .then((employees) =>
        this.masterDataEmployeesMapper.mapToEmployeesResponseDTO(employees),
      );
  }

  private getServiceOrderTypes(): Promise<MasterDataOrderTypeDTO[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(OrderTypePersistent, 'order_type')
      .getRawMany()
      .then((orderTypes) =>
        this.masterDataOrderTypeMapper.mapToOrderTypesResponseDTO(orderTypes),
      );
  }

  private getServiceOrderStates(): Promise<MasterDataOrderStatusDTO[]> {
    return Promise.resolve(OrderStates);
  }

  async getEmployeeByUsername(
    username: string,
  ): Promise<MasterDataEmployeeDTO | null> {
    return this.dataSource
      .getRepository(EmployeePersistent)
      .createQueryBuilder('employee')
      .innerJoinAndSelect('employee.user', 'user')
      .where('user.username = :username', { username })
      .andWhere('user.enabled = :enabled', { enabled: true })
      .andWhere('user.removed = :removed', { removed: false })
      .printSql()
      .getOne()
      .then((result) => {
        if (result) {
          const { id, recordNumber, firstName, lastName } = result;
          return {
            id,
            recordNumber,
            firstName,
            lastName,
          } as MasterDataEmployeeDTO;
        }
        return null;
      });
  }
}
