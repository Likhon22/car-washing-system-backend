import AppError from "../../error/AppErrors";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import authServices from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  if (!userData.email || !userData.password) {
    throw new AppError(400, "Please provide a valid email and password");
  }
  const result = await authServices.loginUser(userData);
  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: result,
    success: true,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const passwordData = req.body;
  const user = req.user;
  const result = await authServices.changePassword(passwordData, user);
  sendResponse(res, {
    statusCode: 200,
    message: "Password changed successfully",
    data: result,
    success: true,
  });
});

const authControllers = {
  loginUser,
  changePassword,
};

export default authControllers;
