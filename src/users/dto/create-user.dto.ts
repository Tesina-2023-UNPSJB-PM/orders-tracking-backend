import { UserStatus } from '../domain/enums/user-status.enum';
import { User } from '../domain/user.entity';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;

  public static mapToUser(from: CreateUserDto): User {
    const result = new User();
    result.firstName = from.firstName;
    result.lastName = from.lastName;
    result.username = from.username;
    result.password = from.password;
    result.status = UserStatus.Created;

    return result;
  }
}
