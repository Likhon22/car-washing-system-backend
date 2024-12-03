import { Router } from "express";
import appUserControllers from "./appUser.controller";
import validateRequest from "../../middleware/validateRequest";
import appUserValidations from "./appUser.validation";

const router = Router();

router.get("/", appUserControllers.getAllAppUsers);
router.get("/:id", appUserControllers.getSingleAppUser);
router.patch(
  "/:id",
  validateRequest(appUserValidations.updateAppUserValidation),
  appUserControllers.updateAppUser,
);
router.delete("/:id", appUserControllers.deleteAppUser);
export const appUserRoutes = router;
