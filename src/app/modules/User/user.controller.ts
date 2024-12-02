import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.service";
import { StatusCodes } from "http-status-codes";
const createAppUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userServices.createAppUserIntoDB(userData);
  sendResponse(res, {
    data: result,
    message: "App user created successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const userControllers = {
  createAppUser,
};

export default userControllers;
