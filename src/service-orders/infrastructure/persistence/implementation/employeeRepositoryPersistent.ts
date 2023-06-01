import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/service-orders/domain/entities/employee.entity';
import { EmployeeRepository } from 'src/service-orders/domain/repositories/employeeRepository';
import { EmployeePersistent } from '../entities/employeePersistent';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeRepositoryPersistent implements EmployeeRepository {
  constructor(
    @InjectRepository(EmployeePersistent)
    private repository: Repository<EmployeePersistent>,
  ) {}

  async getByRecordNumber(recordNumber: string): Promise<Employee | null> {
    const resultDB = await this.repository.findOneBy({ recordNumber });

    return resultDB ? this.mapToEmployee(resultDB) : null;
  }

  async getAll(): Promise<Employee[]> {
    const resultDB = await this.repository.find();
    return resultDB.map((rowResult) => this.mapToEmployee(rowResult));
  }

  async getById(id?: number): Promise<Employee | null> {
    const resultDB = await this.repository.findOneBy({ id });

    return resultDB ? this.mapToEmployee(resultDB) : null;
  }

  save: (employee: Employee) => Promise<Employee>;

  update: (entity?: Employee | undefined) => Promise<Employee>;
  delete: (id?: number | undefined) => Promise<void>;

  private mapToEmployeePersistent(employee: Employee): EmployeePersistent {
    const result = new EmployeePersistent();
    result.id = employee.id;
    result.firstName = employee.firstName;
    result.lastName = employee.lastName;
    result.recordNumber = employee.recordNumber;
    result.sectorId = employee.sectorId;
    return result;
  }

  private mapToEmployee(row: EmployeePersistent): Employee {
    return Employee.create(
      {
        firstName: row.firstName,
        lastName: row.lastName,
        recordNumber: row.recordNumber,
        sectorId: row.sectorId,
      },
      row.id,
    );
  }
}
