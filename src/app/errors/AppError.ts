import { TErrorSources } from "../interface/error";

class AppError extends Error {
  public statusCode: number;
  public errorSources: TErrorSources;

  //   constructor(statusCode: number, message: string, stack = "") {
  //     super(message);
  //     this.statusCode = statusCode;

  //     if (stack) {
  //       this.stack = stack;
  //     } else {
  //       Error.captureStackTrace(this, this.constructor);
  //     }
  //   }

  constructor(
    statusCode: number,
    message: string,
    errorSources: TErrorSources = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorSources = errorSources;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
