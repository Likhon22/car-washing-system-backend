import { TAppUser } from "../AppUser/appUser.interface";
import AppUserModel from "../AppUser/appUser.model";

const createAppUserIntoDB = async (payload: TAppUser) => {
  // Create a new user
  const result = await AppUserModel.create(payload);

  return result;
};

const userServices = {
  createAppUserIntoDB,
};

export default userServices;
