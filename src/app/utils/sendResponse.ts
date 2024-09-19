import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
};


const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: any = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  };

  // If meta exists, add it to the response
  if (data.meta) {
    response.meta = data.meta;
  }

  return res.status(data.statusCode).json(response);
};


export default sendResponse;
