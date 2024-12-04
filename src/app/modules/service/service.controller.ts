import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import serviceServices from "./service.service";

const createService = catchAsync(async (req, res) => {
  const result = await serviceServices.createServiceIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Service created successfully",
    data: result,
    success: true,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await serviceServices.getAllServicesFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All services fetched successfully",
    data: result,
    success: true,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await serviceServices.getSingleServiceFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Service fetched successfully",
    data: result,
    success: true,
  });
});

const serviceControllers = {
  createService,
  getAllServices,
  getSingleService,
};

export default serviceControllers;
