import { Router } from "express";
import slotControllers from "./slot.controller";
import validateRequest from "../../middleware/validateRequest";
import slotValidations from "./slot.validation";

const router = Router();

router.post(
  "/create-slot",
  validateRequest(slotValidations.createSlotValidation),
  slotControllers.createSlot,
);

export const slotRoutes = router;
