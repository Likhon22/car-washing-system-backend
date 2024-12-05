import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const SlotModel = model<TSlot>("Slot", slotSchema);

export default SlotModel;
