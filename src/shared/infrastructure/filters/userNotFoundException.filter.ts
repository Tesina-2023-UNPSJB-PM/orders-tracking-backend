import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserNotFoundException } from 'src/auth/exceptions/userNotFound.exception';

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();
    const status = HttpStatus.NOT_FOUND;

    resp.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: `UserNotFoundException: ${exception.message}`,
    });
  }
}
