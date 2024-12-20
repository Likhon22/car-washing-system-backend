import { model, Schema } from "mongoose";

import { adminMethods, TAddress, TAdmin, TName } from "./admin.interface";
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

const adminSchema = new Schema<TAdmin, adminMethods>(
  {
    name: { type: nameSchema, required: true },
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

adminSchema.statics.isAdminExists = async function (id: string) {
  return this.findOne({ _id: id, isDeleted: { $ne: true } });
};

const AdminModel = model<TAdmin, adminMethods>("Admin", adminSchema);

export default AdminModel;
