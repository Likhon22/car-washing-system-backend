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
  name: TName;
  email: string;
  phone: string;
  address: TAddress;
  isDeleted: boolean;
};
