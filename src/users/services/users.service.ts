import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UserMapper } from '../util/mappers/user.mapper';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDTO): Promise<number> {
    const newUser = UserMapper.mapFromCreateUserDTO(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserDTO[]> {
    const result = await this.userRepository.getAll();

    return result.map((user) => UserMapper.mapToDTO(user));
  }

  async findOne(id: number): Promise<UserDTO | null> {
    const result = await this.userRepository.getById(id);
    return result ? UserMapper.mapToDTO(result) : null;
  }

  async update(updateUserDto: UpdateUserDTO): Promise<void> {
    const userToUpdate = await this.userRepository.getById(updateUserDto.id);
    if (!userToUpdate)
      throw new InvalidDomainException(
        `User with id ${updateUserDto.id} not found`,
      );
    const userEntity = UserMapper.mapFromUpdateUserDTO(updateUserDto);
    this.userRepository.update(userEntity);
  }

  async remove(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
