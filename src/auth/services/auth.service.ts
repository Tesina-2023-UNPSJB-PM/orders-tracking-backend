import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { HashingUtil } from 'src/shared/infrastructure/utils/hashing.util';
import { SignInRequestDTO } from '../dtos/signInRequest.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDTO } from '../dtos/signInResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInRequestDTO): Promise<SignInResponseDTO> {
    const user = await this.usersService.findByUsername(signInDTO.username);
    if (!user)
      throw new UserNotFoundException(`User ${signInDTO.username} not found`);

    const hashingUtil = new HashingUtil();
    if (
      !hashingUtil.isMatch(signInDTO.password, user.password) ||
      !user.enabled
    )
      throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return SignInResponseDTO.createSignInResponse(token, user);
  }
}
