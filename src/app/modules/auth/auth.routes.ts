import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import authValidations from "./auth.validation";
import authControllers from "./auth.controller";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../constant/role";

const router = Router();

router.post(
  "/login",
  validateRequest(authValidations.loginValidation),
  authControllers.loginUser,
);

router.post(
  "/change-password",
  auth(User_Role.ADMIN, User_Role.USER),
  validateRequest(authValidations.passwordChangeValidation),
  authControllers.changePassword,
);
router.post(
  "/refresh-token",
  validateRequest(authValidations.refreshTokenValidation),
  authControllers.refreshToken,
);
router.post(
  "/forget-password",
  validateRequest(authValidations.forgetPasswordValidation),
  authControllers.forgetPassword,
);

router.post(
  "/reset-password",
  validateRequest(authValidations.resetValidation),
  authControllers.resetPassword,
);

export const authRoutes = router;
