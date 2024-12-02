import { model, Schema } from "mongoose";
import { TAddress, TAppUser, TName } from "./appUser.interface";

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  city: { type: String, required: true },
  area: { type: String, required: true },
  houseNo: { type: String, required: true },
  street: { type: String, required: true },
  streetNo: { type: String, required: true },
});

const appUserSchema = new Schema<TAppUser>(
  {
    name: { type: nameSchema, required: true },
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
      type: addressSchema,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const AppUserModel = model<TAppUser>("AppUser", appUserSchema);

export default AppUserModel;
