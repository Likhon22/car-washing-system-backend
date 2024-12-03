import { UserModel } from "./../User/user.model";
import AppError from "../../error/AppErrors";

import { TChangePassword, TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";
import { cleanAuthToken } from "../../utils/cleanAuthToken";

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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expiration_time as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiration_time as string,
  );
  return { accessToken, refreshToken };
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

const refreshToken = async (tokenWithBearer: string) => {
  if (!tokenWithBearer) {
    throw new AppError(401, "Unauthorized access");
  }

  const token = cleanAuthToken(tokenWithBearer);

  // Verify token and check if user exists in the database

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { email, iat } = decoded;
  const user = await UserModel.isUserExitsByEmail(email);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChange(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(401, "Unauthorized access");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expiration_time as string,
  );
  return { accessToken };
};

const authServices = {
  loginUser,
  changePassword,
  refreshToken,
};
export default authServices;
