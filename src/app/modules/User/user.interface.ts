import { Model } from "mongoose";

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isDeleted: boolean;
  isActive: "in-progress" | "blocked";
}

export interface userMethods extends Model<IUser> {
  isUserExitsByEmail(email: string): Promise<IUser | null>;
}
