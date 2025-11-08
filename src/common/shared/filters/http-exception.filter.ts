import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IErrorResponse } from './interfaces/error-interface';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('Exception');

  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const errorResponse = exception.getResponse() as IErrorResponse;
    response.status(statusCode).json({
      statusCode: errorResponse.statusCode,
      success: false,
      message: errorResponse.message.toString(),
      result: null,
    });
    this.logger.error(
      `${request.method} ${request.originalUrl} ${statusCode} error: ${exception.message}`,
    );
  }
}
