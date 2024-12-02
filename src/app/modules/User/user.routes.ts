import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import appUserValidations from "../AppUser/appUser.validation";
import userControllers from "./user.controller";

const router = Router();

router.post(
  "/create-app-user",
  validateRequest(appUserValidations.createAppUserValidation),
  userControllers.createAppUser,
);

export const userRoutes = router;
