import { model, Schema } from "mongoose";
import { appUserMethods, TAddress, TAppUser, TName } from "./appUser.interface";

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

const appUserSchema = new Schema<TAppUser, appUserMethods>(
  {
    name: { type: nameSchema, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profileImg: { type: String },
    phone: { type: String, required: true },
    address: {
      type: addressSchema,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

appUserSchema.statics.isAppUserExists = async function (id: string) {
  return this.findOne({ _id: id, isDeleted: { $ne: true } });
};

const AppUserModel = model<TAppUser, appUserMethods>("AppUser", appUserSchema);

export default AppUserModel;
