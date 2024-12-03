import { model, Schema } from "mongoose";
import { IUser, userMethods } from "./user.interface";

import config from "../../config";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser, userMethods>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordChangedAt: { type: Date },
    role: { type: String, enum: ["user", "admin"], required: true },
    isDeleted: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  this.password = hashedPassword;
  next();
});
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExitsByEmail = async function (email: string) {
  return await UserModel.findOne({ email });
};
userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return jwtIssuedTimestamp < passwordChangedTime;
};

export const UserModel = model<IUser, userMethods>("User", userSchema);
