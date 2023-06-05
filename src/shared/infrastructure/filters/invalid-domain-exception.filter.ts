import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidDomainException } from '../../domain/exceptions/invalidDomain.error';

@Catch(InvalidDomainException)
export class InvalidDomainExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    resp.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: `InvalidDomainException: ${exception.message}`,
    });
  }
}
