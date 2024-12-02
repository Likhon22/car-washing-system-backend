/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import { handleZodError } from "../error/zodError";
import { handleValidationError } from "../error/mongooseValidationError";
import { handleDuplicateError } from "../error/duplicateError";
import AppError from "../error/AppErrors";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  let errorSources: TErrorSources[] = [
    {
      path: "",
      message: "",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  if (err.code === 11000) {
    const simpliFiedError = handleDuplicateError(err);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSources = simpliFiedError?.errorSources;
  }
  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  res.status(statusCode).json({
    message,
    success: false,
    errorSources,
    stack:
      config.node_env === "development" && err.stack ? err.stack : undefined,
  });
};

export default globalErrorHandler;
