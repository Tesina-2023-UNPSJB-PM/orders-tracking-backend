import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInRequestDTO } from '../dtos/signInRequest.dto';
import { SignInResponseDTO } from '../dtos/signInResponse.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/tracking-so/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, type: SignInResponseDTO })
  sigIn(@Body() signInDTO: SignInRequestDTO): Promise<SignInResponseDTO> {
    return this.authService.signIn(signInDTO);
  }
}
