import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type SuccessResponse<T> = {
  success: true;
  message: string;
  result: T;
};

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();

    return next.handle().pipe(
      map((data: T) => {
        if (response?.statusCode === HttpStatus.NO_CONTENT) {
          return data as unknown as SuccessResponse<T>;
        }

        return {
          success: true,
          message: 'success',
          result: (data ?? null) as T,
        };
      }),
    );
  }
}

