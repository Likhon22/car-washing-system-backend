import { Router } from "express";
import { TRoute } from "../interface";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";

const routes = Router();

const moduleRoutes: TRoute[] = [
  {
    path: "/users",
    routes: userRoutes,
  },
  {
    path: "/auth",
    routes: authRoutes, // Add routes for admin module here
  },
];

moduleRoutes.forEach(route => {
  routes.use(route.path, route.routes);
});

export default routes;