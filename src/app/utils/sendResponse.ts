import { Response } from "express";
import { TResponse } from "../interface";

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    message: data.message,
    data: data.data,
    success: data.success,
  });
};

export default sendResponse;
