import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppErrors";
import { TSlot } from "./slot.interface";
import SlotModel from "./slot.model";
import {
  formatTime,
  getSlots,
  timeDifferenceBetweenStartToEnd,
  validateTimeOrder,
} from "./slot.utils";
import { ServiceModel } from "../service/service.model";

const createSlotIntoDB = async (payload: TSlot) => {
  const { startTime, endTime, ...remainingData } = payload;
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);
  payload.startTime = formattedStartTime;
  payload.endTime = formattedEndTime;

  const isServiceExists = await ServiceModel.findById(payload.service);
  if (!isServiceExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Service not found");
  }

  const isStartTimeValid = validateTimeOrder(
    formattedStartTime,
    formattedEndTime,
  );
  if (isStartTimeValid) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Start time should be less than end time",
    );
  }

  //   old  time--11---12
  //   new  time--9-11

    const isSlotTimeAvailable = await SlotModel.find({
      date: payload.date,
      service: payload.service,
      startTime: { $lt: formattedEndTime },
      endTime: { $gt: formattedStartTime },
    });
    if (isSlotTimeAvailable.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Slot time is already booked");
    }
  const timeDifference = timeDifferenceBetweenStartToEnd(
    formattedStartTime,
    formattedEndTime,
  );
  const duration = isServiceExists.duration;
  const totalSlot = timeDifference / duration;
  if (!Number.isInteger(totalSlot)) {
    throw new Error(
      "Invalid input: The total duration does not divide evenly into slots. Please ensure the duration aligns correctly with the start and end times.",
    );
  }

  const slots = getSlots(startTime, duration, totalSlot, remainingData);

  const result = await SlotModel.insertMany(slots);
  return result;
};

const slotServices = {
  createSlotIntoDB,
};

export default slotServices;
