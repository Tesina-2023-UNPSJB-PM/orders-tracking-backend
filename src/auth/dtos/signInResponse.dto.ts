import { ApiProperty } from '@nestjs/swagger';
import { MasterDataEmployeeDTO } from 'src/master-data/dto/master-data-employee.dto';
import { UserDTO } from 'src/users/dto/user.dto';

class UserProfile {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
}

export class SignInResponseDTO {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  userProfile: UserProfile;
  @ApiProperty()
  employeeId: number;

  public static createSignInResponse(
    jwt: string,
    userData: UserDTO,
    employee: MasterDataEmployeeDTO | null,
  ): SignInResponseDTO {
    const result = new SignInResponseDTO();
    result.access_token = jwt;
    result.userProfile = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
    };
    result.employeeId = employee?.id ?? -1;

    return result;
  }
}
