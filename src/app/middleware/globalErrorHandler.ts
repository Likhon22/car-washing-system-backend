/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import { handleZodError } from "../error/zodError";
import { handleValidationError } from "../error/mongooseValidationError";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  let StatusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  let errorSources: TErrorSources[] = [
    {
      path: "",
      message: "",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    StatusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    StatusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  res.status(StatusCode).json({
    message,
    success: false,
    errorSources,
    err,
    stack:
      config.node_env === "development" && err.stack ? err.stack : undefined,
  });
};

export default globalErrorHandler;
