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

const slotControllers = {
  createSlot,
};

export default slotControllers;
