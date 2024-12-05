import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppErrors";
import AppUserModel from "../AppUser/appUser.model";

import SlotModel from "../slot/slot.model";
import { bookingSearchableFields } from "./booking.constant";
import { TBooking } from "./booking.interface";
import BookingModel from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const isCustomerExists = await AppUserModel.findById(payload.customer);
  if (!isCustomerExists) {
    throw new AppError(404, "Customer not found");
  }
  const isSlotExists = await SlotModel.findById(payload.slot);
  if (!isSlotExists) {
    throw new AppError(404, "Slot not found");
  }

  const isServiceExists = await SlotModel.findOne({
    _id: payload.slot,
    service: payload.service,
  });

  if (!isServiceExists) {
    throw new AppError(404, `Service not found on this slot `);
  }
  const newBooking = await BookingModel.create(payload);
  return newBooking;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookings = new QueryBuilder(
    BookingModel.find()
      .populate("customer")
      .populate("slot")
      .populate("service"),
    query,
  )
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await bookings.modelQuery;
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const booking = await BookingModel.findById(id)
    .populate("customer")
    .populate("slot")
    .populate("service");
  if (!booking) {
    throw new AppError(404, "Booking not found");
  }
  return booking;
};

const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
};

export default bookingServices;
