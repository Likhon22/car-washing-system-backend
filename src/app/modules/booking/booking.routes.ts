import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import bookingValidations from "./booking.validation";
import bookingControllers from "./booking.controller";

const router = Router();

router.post(
  "/create-booking",
  validateRequest(bookingValidations.createBookingValidation),
  bookingControllers.createBooking,
);

router.get("/", bookingControllers.getAllBookings);

router.get("/:id", bookingControllers.getSingleBooking);

export const bookingRoutes = router;
