import { Router } from "express";

import validateRequest from "../../middleware/validateRequest";
import adminValidations from "./admin.validation";
import adminControllers from "./admin.controller";

const router = Router();

router.get("/", adminControllers.getAllAdmins);
router.get("/:id", adminControllers.getSingleAdmin);
router.patch(
  "/:id",
  validateRequest(adminValidations.updateAdminValidation),
  adminControllers.updateAdmin,
);
router.delete("/:id", adminControllers.deleteAdmin);
export const adminRoutes = router;
