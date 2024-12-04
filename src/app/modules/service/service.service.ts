import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppErrors";
import { serviceSearchableFields } from "./service.constant";
import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";
import { generateServiceId } from "./service.utils";

const createServiceIntoDB = async (payload: TService) => {
  const service = await ServiceModel.isServiceExists(payload.name);
  const serviceId = service?.id;

  if (service) {
    throw new AppError(400, "Service with this name already exists");
  }

  payload.id = await generateServiceId();
  if (serviceId && serviceId === payload.id) {
    throw new AppError(400, "Service with this id already exists");
  }

  const newService = await ServiceModel.create(payload);
  return newService;
};

const getAllServicesFromDB = async (query: Record<string, unknown>) => {
  const services = new QueryBuilder(ServiceModel.find(), query)
    .search(serviceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await services.modelQuery;
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const service = await ServiceModel.findOne({
    _id: id,

    isDeleted: { $ne: true },
  });
  if (!service) {
    throw new AppError(404, "Service not found");
  }
  return service;
};

const updateServiceInDB = async (id: string, payload: Partial<TService>) => {
  const isServiceExists = await ServiceModel.findOne({
    _id: id,

    isDeleted: { $ne: true },
  });

  if (!isServiceExists) {
    throw new AppError(404, "Service not found");
  }
  if (payload.name) {
    const service = await ServiceModel.isServiceExists(payload?.name);

    if (service) {
      throw new AppError(400, "Service with this name already exists");
    }
  }

  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const isServiceExists = await ServiceModel.findOne({
    _id: id,

    isDeleted: { $ne: true },
  });

  if (!isServiceExists) {
    throw new AppError(404, "Service not found");
  }
  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const serviceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
};

export default serviceServices;
