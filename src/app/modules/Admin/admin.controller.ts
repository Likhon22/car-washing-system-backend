import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import adminServices from "./admin.service";

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All admins fetched successfully",
    data: result,
    success: true,
  });
});
const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.getSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Admin fetched successfully",
    data: result,
    success: true,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.updateAdminInDB(id, req.body.admin);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Admin updated successfully",
    data: result,
    success: true,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Admin deleted successfully",
    data: result,
    success: true,
  });
});

const adminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

export default adminControllers;
