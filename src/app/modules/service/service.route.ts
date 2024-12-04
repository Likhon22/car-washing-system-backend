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

export const serviceRoutes = router;
