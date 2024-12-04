import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import appUserServices from "./appUser.service";

const getAllAppUsers = catchAsync(async (req, res) => {
  const result = await appUserServices.getAllAppUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All app users fetched successfully",
    data: result,
    success: true,
  });
});
const getSingleAppUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await appUserServices.getSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "App user fetched successfully",
    data: result,
    success: true,
  });
});

const updateAppUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await appUserServices.updateAppUserInDB(id, req.body.appUser);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "App user updated successfully",
    data: result,
    success: true,
  });
});

const deleteAppUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await appUserServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "App user deleted successfully",
    data: result,
    success: true,
  });
});

const appUserControllers = {
  getAllAppUsers,
  getSingleAppUser,
  updateAppUser,
  deleteAppUser,
};

export default appUserControllers;
