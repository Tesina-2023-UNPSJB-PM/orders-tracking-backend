export interface CrudRepository<T> {
  getAll: () => Promise<T[]>;
  getById: (id: number) => Promise<T | null>;
  save: (customer: T) => Promise<T>;
  update: (customer: T) => Promise<T>;
  delete: (id: number) => Promise<void>;
}
