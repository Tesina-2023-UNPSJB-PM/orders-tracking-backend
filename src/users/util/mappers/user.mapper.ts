import { HashingUtil } from 'src/shared/infrastructure/utils/hashing.util';
import { User } from 'src/users/domain/user.entity';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { UpdateUserDTO } from 'src/users/dto/updateUser.dto';
import { UserDTO } from 'src/users/dto/user.dto';

export class UserMapper {
  public static mapToDTO(entity: User): UserDTO {
    return UserDTO.builder(entity.username)
      .id(entity.id)
      .firstName(entity.firstName)
      .lastName(entity.lastName)
      .email(entity.email)
      .password(entity.password)
      .enabled(entity.enabled)
      .build();
  }

  public static mapFromUpdateUserDTO(dto: UpdateUserDTO): User {
    const result = new User();
    result.id = dto.id;
    result.firstName = dto.firstName;
    result.lastName = dto.lastName;
    result.email = dto.email;
    result.username = dto.username;
    result.password = this.hashPassword(dto.password);
    result.enabled = dto.enabled;

    return result;
  }

  public static mapFromCreateUserDTO(dto: CreateUserDTO): User {
    const result = new User();
    result.firstName = dto.firstName;
    result.lastName = dto.lastName;
    result.email = dto.email;
    result.username = dto.username;
    result.password = this.hashPassword(dto.password);
    result.enabled = true;

    return result;
  }

  private static hashPassword(pass: string) {
    const hashingUtil = new HashingUtil();

    return hashingUtil.generateHash(pass);
  }
}
