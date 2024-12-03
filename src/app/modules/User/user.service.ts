/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

import { TAppUser } from "../AppUser/appUser.interface";
import AppUserModel from "../AppUser/appUser.model";
import { UserModel } from "./user.model";
import { IUser } from "./user.interface";
import { generateAdminUserId, generateAppUserId } from "./user.utils";
import AppError from "../../error/AppErrors";
import AdminModel from "../Admin/admin.model";

const createAppUserIntoDB = async (payload: TAppUser, password: string) => {
  const isUserExitsByEmail = await UserModel.isUserExitsByEmail(payload.email);

  if (isUserExitsByEmail) {
    throw new AppError(400, "User already exists with the same email");
  }
  const user: Partial<IUser> = {};

  user.password = password;

  user.id = await generateAppUserId();
  user.email = payload.email;
  user.role = "user";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(500, "User creation failed");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const result = await AppUserModel.create([payload], { session: session });
    if (!result.length) {
      throw new AppError(500, "App user creation failed");
    }
    await session.commitTransaction();
    await session.endSession();

    return { newUser, result };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err.message);
  }
};
const createAdminIntoDB = async (payload: TAppUser, password: string) => {
  const isUserExitsByEmail = await UserModel.isUserExitsByEmail(payload.email);

  if (isUserExitsByEmail) {
    throw new AppError(400, "User already exists with the same email");
  }
  const user: Partial<IUser> = {};

  user.password = password;

  user.id = await generateAdminUserId();
  user.email = payload.email;
  user.role = "admin";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(500, "User creation failed");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const result = await AdminModel.create([payload], { session: session });
    if (!result.length) {
      throw new AppError(500, "App user creation failed");
    }
    await session.commitTransaction();
    await session.endSession();

    return { newUser, result };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err.message);
  }
};

const userServices = {
  createAppUserIntoDB,
  createAdminIntoDB,
};

export default userServices;
