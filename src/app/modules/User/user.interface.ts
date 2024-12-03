import { Model } from "mongoose";

export interface IUser {
  id: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: "user" | "admin";
  isDeleted: boolean;
  isActive: "in-progress" | "blocked";
}

export interface userMethods extends Model<IUser> {
  isUserExitsByEmail(email: string): Promise<IUser | null>;
  isUserDeleted(user: IUser): boolean;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
