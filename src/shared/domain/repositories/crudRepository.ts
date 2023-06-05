export interface CrudRepository<T> {
  getAll: () => Promise<T[]>;
  getById: (id?: number) => Promise<T | null>;
  save: (entity?: T) => Promise<T>;
  update: (entity?: T) => Promise<T>;
  delete: (id?: number) => Promise<void>;
}
