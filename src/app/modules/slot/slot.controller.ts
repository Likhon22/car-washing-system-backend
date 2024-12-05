import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import slotServices from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
  const result = await slotServices.createSlotIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Slot created successfully",
    data: result,
    success: true,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await slotServices.getAllSlotsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All slots fetched successfully",
    data: result,
    success: true,
  });
});

const getSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await slotServices.getSingleSlotFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Slot fetched successfully",
    data: result,
    success: true,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await slotServices.updateSlotInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Slot updated successfully",
    data: result,
    success: true,
  });
});
const slotControllers = {
  createSlot,
  getAllSlots,
  getSingleSlot,
  updateSlot,
};

export default slotControllers;
