import { UserModel } from "./../User/user.model";
import AppError from "../../error/AppErrors";

import { TChangePassword, TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await UserModel.isUserExitsByEmail(email);

  if (!user) {
    throw new AppError(404, "User not found");
  }
  const matchedPassword = await UserModel.isPasswordMatched(
    password,
    user.password,
  );

  if (!matchedPassword) {
    throw new AppError(401, "Invalid password");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expiration_time as string,
  );
  const accessToken = `Bearer ${token}`;
  return accessToken;
};

const changePassword = async (payload: TChangePassword, user: JwtPayload) => {
  const { oldPassword, newPassword, confirmPassword } = payload;
  const isUserExitsByEmail = await UserModel.isUserExitsByEmail(user.email);
  if (!isUserExitsByEmail) {
    throw new AppError(404, "User not found");
  }

  const matchedPassword = await UserModel.isPasswordMatched(
    oldPassword,
    isUserExitsByEmail.password,
  );

  if (!matchedPassword) {
    throw new AppError(401, "Invalid password");
  }
  if (newPassword !== confirmPassword) {
    throw new AppError(400, "New password is doesn't match");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );

  const update = await UserModel.findOneAndUpdate(
    { email: user.email, role: user.role },
    { password: hashedPassword, passwordChangedAt: new Date() },
  );
  return update;
};

const authServices = {
  loginUser,
  changePassword,
};
export default authServices;
