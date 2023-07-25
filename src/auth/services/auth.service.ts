import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { HashingUtil } from 'src/shared/infrastructure/utils/hashing.util';
import { SignInDTO } from '../dtos/sigIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<any> {
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

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
