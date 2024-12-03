import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppErrors";
import { UserModel } from "../modules/User/user.model";
import catchAsync from "../utils/catchAsync";
import config from "../config";

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, "Unauthorized access");
    }
    // Verify token and check if user exists in the database
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;
    const { email, role, iat } = decoded;
    const user = await UserModel.isUserExitsByEmail(email);

    if (!user) {
      throw new AppError(404, "User not found");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "Unauthorized access");
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

    req.user = decoded;

    next();
  });
};
