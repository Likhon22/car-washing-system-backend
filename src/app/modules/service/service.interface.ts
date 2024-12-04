import { Model } from "mongoose";

export interface TService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

export interface ServiceMethods extends Model<TService> {
  isServiceExists(name: string): Promise<TService | null>;
}
