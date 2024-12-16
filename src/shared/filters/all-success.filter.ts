/* eslint-disable @typescript-eslint/no-unused-vars */
// src/common/interceptors/all-success-response.filter.ts

import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponseHelper } from './success-reponse.helper';

@Injectable()
export class AllSuccessResponseFilter<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse<Response>();

        const successResponse = SuccessResponseHelper.formatSuccess(
          'Request was successful', // Default message
          data,
          response.statusCode, // Use the status code from the response
          request.originalUrl, // Path of the request
        );

        return successResponse;
      }),
    );
  }
}
