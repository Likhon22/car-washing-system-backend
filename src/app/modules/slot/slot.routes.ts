import { Router } from "express";
import slotControllers from "./slot.controller";
import validateRequest from "../../middleware/validateRequest";
import slotValidations from "./slot.validation";

const router = Router();

router.post(
  "/create-slot",
  validateRequest(slotValidations.slotValidation),
  slotControllers.createSlot,
);

router.get("/", slotControllers.getAllSlots);

router.get("/:id", slotControllers.getSingleSlot);
router.patch(
  "/:id",
  validateRequest(slotValidations.slotValidation),
  slotControllers.updateSlot,
);

export const slotRoutes = router;
