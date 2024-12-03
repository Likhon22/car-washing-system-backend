import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppErrors";
import { UserModel } from "../modules/User/user.model";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import { cleanAuthToken } from "../utils/cleanAuthToken";

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
      throw new AppError(401, "Unauthorized access");
    }
    const token = cleanAuthToken(tokenWithBearer);
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
