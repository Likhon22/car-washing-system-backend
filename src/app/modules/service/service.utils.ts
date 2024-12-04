import { ServiceModel } from "./service.model";

export const generateServiceId = async () => {
  const isServiceExists = await ServiceModel.findOne().sort({ createdAt: -1 });

  if (isServiceExists) {
    const id = isServiceExists.id;
    const numericPart = id.match(/\d+/)?.[0];
    const incrementId = (Number(numericPart) + 1).toString().padStart(4, "0");
    return `S-${incrementId}`;
  }
  const initialId = `S-0001`;
  return initialId;
};
