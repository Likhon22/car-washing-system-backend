import mongoose, { Model } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TAddress = {
  city: string;
  area: string;
  houseNo: string;
  street: string;
  streetNo: string;
};

export type TAdmin = {
  id: string;
  user: mongoose.Types.ObjectId;
  name: TName;
  email: string;
  phone: string;
  address: TAddress;
  isDeleted: boolean;
};
export interface adminMethods extends Model<TAdmin> {
  isAdminExists(id: string): Promise<TAdmin | null>;
}
