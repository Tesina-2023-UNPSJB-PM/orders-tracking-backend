import { Employee } from 'src/service-orders/domain/entities/employee.entity';
import { EmployeeRepository } from 'src/service-orders/domain/repositories/employeeRepository';

export class EmployeePersistent implements EmployeeRepository {
  private db: Employee[] = [];

  constructor() {
    this.db.push(
      Employee.create(
        {
          firstName: 'Juan Ramon',
          lastName: 'García',
          recordNumber: '1245',
          sectorId: 1,
        },
        1,
      ),
    );

    this.db.push(
      Employee.create(
        {
          firstName: 'Karina Griselda',
          lastName: 'Medina',
          recordNumber: '4545',
          sectorId: 2,
        },
        2,
      ),
    );

    this.db.push(
      Employee.create(
        {
          firstName: 'Gustavo Luis',
          lastName: 'Gonzalez',
          recordNumber: '7489',
          sectorId: 3,
        },
        3,
      ),
    );
  }

  async getByRecordNumber(recordNumber: string): Promise<Employee | null> {
    const result = this.db.find((row) => row.recordNumber === recordNumber);

    return result ? result : null;
  }

  async getAll(): Promise<Employee[]> {
    return this.db;
  }

  async getById(id?: number): Promise<Employee | null> {
    const result = this.db.find((row) => row.id === id);

    return result ? result : null;
  }
  save: (entity?: Employee | undefined) => Promise<Employee>;
  update: (entity?: Employee | undefined) => Promise<Employee>;
  delete: (id?: number | undefined) => Promise<void>;
}
