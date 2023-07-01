export interface CrudRepository<T> {
  getAll: () => Promise<T[]>;
  getById: (id?: number) => Promise<T | null>;
  save: (entity: T) => Promise<number>;
  update: (entity: T) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
