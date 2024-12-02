import { Router } from "express";

export type TResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
};

export type TRoute = {
  path: string;
  routes: Router;
};
