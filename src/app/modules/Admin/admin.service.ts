/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import AppError from "../../error/AppErrors";

import { UserModel } from "../User/user.model";
import AdminModel from "./admin.model";
import { TAdmin } from "./admin.interface";

const getAllAdminsFromDB = async () => {
  const admins = await AdminModel.find();
  return admins;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await AdminModel.isAdminExists(id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

const updateAdminInDB = async (id: string, payload: Partial<TAdmin>) => {
  const isUserExists = await AdminModel.isAdminExists(id);
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
  const updatedAdmin = await AdminModel.findByIdAndUpdate(id, modifiedPayload, {
    new: true,
    runValidators: true,
  });

  return updatedAdmin;
};
const deleteUserFromDB = async (id: string) => {
  const isAdminExists = await AdminModel.isAdminExists(id);
  console.log(isAdminExists);

  if (!isAdminExists) {
    throw new AppError(404, "User not found");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userId = isAdminExists.user;
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    const deletedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();
    return { deletedAdmin, deletedUser };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err.message);
  }
};

const adminServices = {
  getAllAdminsFromDB,
  getSingleUserFromDB,
  updateAdminInDB,
  deleteUserFromDB,
};
export default adminServices;
