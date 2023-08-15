import { Employee } from 'src/service-orders/domain/entities/employee.entity';
import { EmployeePersistent } from '../entities/employeePersistent';
import { MapperSectorPersistent } from './mapperSectorPersistent';

export class MapperEmployeePersistent {
  private mapperSector: MapperSectorPersistent;

  constructor() {
    this.mapperSector = new MapperSectorPersistent();
  }

  mapToEmployeePersistent(employee: Employee): EmployeePersistent {
    const result = new EmployeePersistent();
    result.id = employee.id;
    result.firstName = employee.firstName;
    result.lastName = employee.lastName;
    result.recordNumber = employee.recordNumber;
    result.sector = this.mapperSector.mapToSectorPersistent(employee.sector);
    return result;
  }

  mapToEmployee(row: EmployeePersistent): Employee {
    return Employee.create(
      {
        firstName: row.firstName ?? '',
        lastName: row.lastName ?? '',
        recordNumber: row.recordNumber ?? '',
        sector: this.mapperSector.mapToSector(row.sector ?? {id: 0, name: '', description: ''}) ,
      },
      row.id,
    );
  }
}
