import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import serviceValidations from "./service.validation";
import serviceControllers from "./service.controller";

const router = Router();

router.post(
  "/create-service",
  validateRequest(serviceValidations.createServiceValidation),
  serviceControllers.createService,
);

router.get("/", serviceControllers.getAllServices);
router.get("/:id", serviceControllers.getSingleService);
router.patch(
  "/:id",
  validateRequest(serviceValidations.updateServiceValidation),
  serviceControllers.updateService,
);
router.delete("/:id", serviceControllers.deleteService);

export const serviceRoutes = router;
