import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import bookingValidations from "./booking.validation";
import bookingControllers from "./booking.controller";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../constant/role";

const router = Router();

router.post(
  "/create-booking",
  auth(User_Role.USER),
  validateRequest(bookingValidations.createBookingValidation),
  bookingControllers.createBooking,
);

router.get("/", auth(User_Role.ADMIN), bookingControllers.getAllBookings);

router.get("/:id", auth(User_Role.USER), bookingControllers.getSingleBooking);

export const bookingRoutes = router;
