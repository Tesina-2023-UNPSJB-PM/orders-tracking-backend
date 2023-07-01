import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/service-orders/domain/entities/employee.entity';
import { EmployeeRepository } from 'src/service-orders/domain/repositories/employeeRepository';
import { EmployeePersistent } from '../entities/employeePersistent';
import { Repository } from 'typeorm';
import { MapperEmployeePersistent } from '../mappers/mapperEmployePersistent';

@Injectable()
export class EmployeeRepositoryPersistent implements EmployeeRepository {
  private mapper: MapperEmployeePersistent;
  constructor(
    @InjectRepository(EmployeePersistent)
    private repository: Repository<EmployeePersistent>,
  ) {
    this.mapper = new MapperEmployeePersistent();
  }

  async getByRecordNumber(recordNumber: string): Promise<Employee | null> {
    const resultDB = await this.repository.findOneBy({ recordNumber });

    return resultDB ? this.mapper.mapToEmployee(resultDB) : null;
  }

  async getAll(): Promise<Employee[]> {
    const resultDB = await this.repository.find();
    return resultDB.map((rowResult) => this.mapper.mapToEmployee(rowResult));
  }

  async getById(id?: number): Promise<Employee | null> {
    const resultDB = await this.repository.findOneBy({ id });

    return resultDB ? this.mapper.mapToEmployee(resultDB) : null;
  }

  save: (employee: Employee) => Promise<number>;

  update: (entity?: Employee | undefined) => Promise<void>;
  delete: (id?: number | undefined) => Promise<void>;
}
