/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from "http-status-codes";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const message = "Duplicate field value";

  const keyValueRegex = /(\w+):\s*"([^"]+)"/g;

  // Store the extracted key-value pair
  let match;
  let duplicateField = "";
  let path = "";

  // Check if there are any matches in the error message
  while ((match = keyValueRegex.exec(err?.errmsg)) !== null) {
    // Construct the duplicate field in the desired format, like "email: \"sdfsdf\""
    duplicateField = `${match[1]}:${match[2]}`;
    path = match[1];
  }

  const errorSource: TErrorSources[] = [
    {
      path: `${path}`,
      message: `${duplicateField} is already exists`,
    },
  ];
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message,
    errorSources: errorSource,
  };
};
