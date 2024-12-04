import { model, Schema } from "mongoose";
import { ServiceMethods, TService } from "./service.interface";

const serviceSchema = new Schema<TService, ServiceMethods>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

serviceSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  next();
});
serviceSchema.statics.isServiceExists = async function (name: string) {
  const formattedName = name.trim().replace(/\s+/g, " ");
  return await this.findOne({
    isDeleted: { $ne: true },
    name: {
      $regex: `^${formattedName}$`,
      $options: "i",
    },
  });
};
export const ServiceModel = model<TService, ServiceMethods>(
  "Service",
  serviceSchema,
);
