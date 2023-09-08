import { ExecutionHistoryPersistent } from 'src/service-orders/infrastructure/persistence/entities/executionHistoryPersistent';
import { ReasonStatusPersistent } from 'src/service-orders/infrastructure/persistence/entities/reasonStatusPersistent';
import { CrudRepository } from 'src/shared/domain/repositories/crudRepository';

export interface ExecutionHistoryRepository
  extends CrudRepository<ExecutionHistoryPersistent> {
  getHistoryOfExecution: (
    executionId: number,
  ) => Promise<ExecutionHistoryPersistent[]>;
  getReasonStatusById: (
    reasonId: number,
  ) => Promise<ReasonStatusPersistent | null>;
}
