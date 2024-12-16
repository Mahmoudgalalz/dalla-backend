/* eslint-disable @typescript-eslint/no-unused-vars */
export interface SuccessResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  path: string;
  timestamp: string;
}

export class SuccessResponseHelper<T> {
  static formatSuccess<T>(
    message: string,
    data: T,
    statusCode: number = 200,
    path: string = '',
  ): SuccessResponse<T> {
    return {
      statusCode,
      success: true,
      message,
      data,
      path,
      timestamp: new Date().toISOString(),
    };
  }
}
