import { ApiProperty } from '@nestjs/swagger';
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

  public static createSignInResponse(
    jwt: string,
    userData: UserDTO,
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

    return result;
  }
}
