import { Router } from "express";
import slotControllers from "./slot.controller";
import validateRequest from "../../middleware/validateRequest";
import slotValidations from "./slot.validation";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../constant/role";

const router = Router();

router.post(
  "/create-slot",
  auth(User_Role.ADMIN),
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
