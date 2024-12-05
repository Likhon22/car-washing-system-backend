import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import serviceValidations from "./service.validation";
import serviceControllers from "./service.controller";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../constant/role";

const router = Router();

router.post(
  "/create-service",
  auth(User_Role.ADMIN),
  validateRequest(serviceValidations.createServiceValidation),
  serviceControllers.createService,
);

router.get("/", serviceControllers.getAllServices);
router.get("/:id", serviceControllers.getSingleService);
router.patch(
  "/:id",
  auth(User_Role.ADMIN),
  validateRequest(serviceValidations.updateServiceValidation),
  serviceControllers.updateService,
);
router.delete("/:id", auth(User_Role.ADMIN), serviceControllers.deleteService);

export const serviceRoutes = router;
