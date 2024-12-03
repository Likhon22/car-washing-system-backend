import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.service";
import { StatusCodes } from "http-status-codes";
const createAppUser = catchAsync(async (req, res) => {
  const { appUser, password } = req.body;
  const result = await userServices.createAppUserIntoDB(appUser, password);

  sendResponse(res, {
    data: result,
    message: "App user created successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { admin, password } = req.body;
  const result = await userServices.createAdminIntoDB(admin, password);
  sendResponse(res, {
    data: result,
    message: "Admin created successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const userControllers = {
  createAppUser,
  createAdmin,
};

export default userControllers;
