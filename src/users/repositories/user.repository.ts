import { CrudRepository } from 'src/shared/domain/repositories/crudRepository';
import { User } from '../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserRepository implements CrudRepository<User> {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  getAll(): Promise<User[]> {
    return this.repository.find({ where: { removed: false } });
  }

  getById(id?: number): Promise<User | null> {
    return this.repository.findOneBy({ id, removed: false });
  }

  async save(entity: User): Promise<number> {
    const userSaved = await this.repository.save(entity);
    return userSaved.id;
  }

  async update(entity: User): Promise<void> {
    this.repository.update(entity.id, entity);
  }

  async delete(id: number): Promise<void> {
    this.repository.update(id, { removed: true });
  }
}
