import { Types } from "mongoose";

export type TBooking = {
  customer: Types.ObjectId;
  slot: Types.ObjectId;
  service: Types.ObjectId;
  vehicle:
    | "Car"
    | "Truck"
    | "SUV"
    | "Van"
    | "Motorcycle"
    | "Bus"
    | "ElectricVehicle"
    | "HybridVehicle"
    | "Bicycle"
    | "Tractor";
  vehicleBrand: string;
  manufactureYear: number;
  registrationPlate: string;
};
