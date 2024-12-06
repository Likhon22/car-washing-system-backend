import config from "../../config";
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
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

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

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    message: "Password changed successfully",
    data: result,
    success: true,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authServices.forgetPassword(email);
  sendResponse(res, {
    statusCode: 200,
    message: `Password reset link sent to ${email}`,
    success: true,
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await authServices.resetPassword(token as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Password reset successfully",
    data: result,
    success: true,
  });
});

const authControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};

export default authControllers;
