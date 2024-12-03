import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const message = `Invalid ${err.path}: ${err.value}`;
  const statusCode = StatusCodes.BAD_REQUEST;
  const errorSources: TErrorSources[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};
