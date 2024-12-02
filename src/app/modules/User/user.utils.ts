import { UserModel } from "./user.model";

export const generateAppUserId = async () => {
  const user = await UserModel.findOne({ role: "user" }).sort({
    createdAt: -1,
  });

  if (user) {
    const currentId = user.id;

    const numericPart = currentId.match(/\d+/)?.[0];

    const incrementId = (Number(numericPart) + 1).toString().padStart(4, "0");

    return `u-${incrementId}`;
  }
  const initialId = "u-0001";
  return initialId;
};
export const generateAdminUserId = async () => {
  const user = await UserModel.findOne({ role: "admin" }).sort({
    createdAt: -1,
  });

  if (user) {
    const currentId = user.id;

    const numericPart = currentId.match(/\d+/)?.[0];

    const incrementId = (Number(numericPart) + 1).toString().padStart(4, "0");

    return `A-${incrementId}`;
  }
  const initialId = "A-0001";
  return initialId;
};
