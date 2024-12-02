/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = 404;
  res.status(statusCode).json({
    success: false,
    message: "Api not found",
    errorSource: {
      path: "",
      message: "",
    },
  });
};

export default notFound;
