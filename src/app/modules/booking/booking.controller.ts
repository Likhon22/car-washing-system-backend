import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import bookingServices from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Booking created successfully",
    data: result,
    success: true,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All bookings fetched successfully",
    data: result,
    success: true,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.getSingleBookingFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Booking fetched successfully",
    data: result,
    success: true,
  });
});

const bookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking,
};

export default bookingControllers;
