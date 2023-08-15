import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { CustomerAlreadyExistsException } from '../../../customers/domain/exceptions/customerAlreadyExists';
import { NonExistentCustomer } from '../../../customers/domain/exceptions/nonExistentCustomer';
import { Response } from 'express';

@Catch(CustomerAlreadyExistsException, NonExistentCustomer)
export class CustomerExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: `CustomerDomainException: ${exception.message}`,
    });
  }
}
