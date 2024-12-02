import { Router } from "express";
import { TRoute } from "../interface";
import { userRoutes } from "../modules/User/user.routes";

const routes = Router();

const moduleRoutes: TRoute[] = [
  {
    path: "/users",
    routes: userRoutes,
  },
];

moduleRoutes.forEach(route => {
  routes.use(route.path, route.routes);
});

export default routes;
