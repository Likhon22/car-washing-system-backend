import z from "zod";
import { VehicleType } from "./booking.constant";

const createBookingValidation = z.object({
  body: z.object({
    service: z.string(),
    slot: z.string(),
    vehicle: z.enum([...VehicleType] as [string, ...string[]]),
    vehicleBrand: z.string(),
    manufactureYear: z.number(),
    registrationPlate: z.string(),
  }),
});

const bookingValidations = {
  createBookingValidation,
};

export default bookingValidations;
