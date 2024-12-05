import { model, Schema } from "mongoose";

import { VehicleType } from "./booking.constant";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "AppUser", required: true },
    slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    vehicle: { type: String, enum: VehicleType },
    vehicleBrand: { type: String, required: true },
    manufactureYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
  },
  { timestamps: true },
);

const BookingModel = model<TBooking>("Booking", bookingSchema);

export default BookingModel;
