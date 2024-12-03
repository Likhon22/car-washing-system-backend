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

export type TAppUser = {
  user: mongoose.Types.ObjectId;
  id: string;
  name: TName;
  email: string;
  phone: string;
  address: TAddress;
  isDeleted: boolean;
};

export interface appUserMethods extends Model<TAppUser> {
  isAppUserExists(id: string): Promise<TAppUser | null>;
}
