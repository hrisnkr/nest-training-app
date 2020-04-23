import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

interface IdentifiableRequest extends Request {
  id: string;
}
let counter = 0;

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = new Date();
    const req = context.switchToHttp().getRequest<IdentifiableRequest>();
    req.id = (counter++).toString();
    const id = req.id.padStart(8, '0');

    console.log(`${start.toISOString()}${id}>>>${req.method}${req.url}`);

    return next.handle().pipe(
      tap(() => {
        const end = new Date();
        console.log(
          `${end.toISOString()}${id}<<<${req.res.statusCode}${end.getTime() -
            start.getTime()}ms`,
        );
      }),
    );
  }
}
