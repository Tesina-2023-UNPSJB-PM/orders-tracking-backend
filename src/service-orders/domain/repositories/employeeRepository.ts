import { CrudRepository } from '../../../shared/domain/repositories/crudRepository';
import { Employee } from '../entities/employee.entity';

export interface EmployeeRepository extends CrudRepository<Employee> {
  getByRecordNumber: (recordNumber: string) => Promise<Employee | null>;
}
