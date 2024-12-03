import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import appUserValidations from "../AppUser/appUser.validation";
import userControllers from "./user.controller";
import adminValidations from "../Admin/admin.validation";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../constant/role";

const router = Router();

router.post(
  "/create-app-user",
  auth(User_Role.ADMIN),
  validateRequest(appUserValidations.createAppUserValidation),
  userControllers.createAppUser,
);

router.post(
  "/create-admin",
  auth(User_Role.ADMIN),
  validateRequest(adminValidations.createAdminValidation),
  userControllers.createAdmin,
);

export const userRoutes = router;
