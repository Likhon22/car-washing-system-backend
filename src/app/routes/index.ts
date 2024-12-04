import { Router } from "express";
import { TRoute } from "../interface";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { appUserRoutes } from "../modules/AppUser/appUser.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { serviceRoutes } from "../modules/service/service.route";

const routes = Router();

const moduleRoutes: TRoute[] = [
  {
    path: "/users",
    routes: userRoutes,
  },
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/app-users",
    routes: appUserRoutes,
  },
  {
    path: "/admin",
    routes: adminRoutes,
  },
  {
    path: "/services",
    routes: serviceRoutes,
  },
];

moduleRoutes.forEach(route => {
  routes.use(route.path, route.routes);
});

export default routes;
