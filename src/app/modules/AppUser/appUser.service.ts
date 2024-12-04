/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import AppError from "../../error/AppErrors";
import { TAppUser } from "./appUser.interface";
import AppUserModel from "./appUser.model";
import { UserModel } from "../User/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchAbleFieldsOfAppUsers } from "./appUser.constant";

const getAllAppUsersFromDB = async (query: Record<string, unknown>) => {
  const appUsers = new QueryBuilder(AppUserModel.find(), query)
    .search(searchAbleFieldsOfAppUsers)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await appUsers.modelQuery;
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await AppUserModel.isAppUserExists(id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

const updateAppUserInDB = async (id: string, payload: Partial<TAppUser>) => {
  const isUserExists = await AppUserModel.isAppUserExists(id);
  if (!isUserExists) {
    throw new AppError(404, "User not found");
  }
  const { address, name, ...remainingData } = payload;
  const modifiedPayload: Record<string, unknown> = {
    ...remainingData,
  };
  if (address && Object.entries(address).length > 0) {
    for (const [key, value] of Object.entries(address)) {
      modifiedPayload[`address.${key}`] = value;
    }
  }
  if (name && Object.entries(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value;
    }
  }
  const updatedAppUser = await AppUserModel.findByIdAndUpdate(
    id,
    modifiedPayload,
    { new: true, runValidators: true },
  );

  return updatedAppUser;
};
const deleteUserFromDB = async (id: string) => {
  const isAppUserExists = await AppUserModel.isAppUserExists(id);

  if (!isAppUserExists) {
    throw new AppError(404, "User not found");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userId = isAppUserExists.user;
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    const deletedAppUser = await AppUserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();
    return { deletedAppUser, deletedUser };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err.message);
  }
};

const appUserServices = {
  getAllAppUsersFromDB,
  getSingleUserFromDB,
  updateAppUserInDB,
  deleteUserFromDB,
};
export default appUserServices;
