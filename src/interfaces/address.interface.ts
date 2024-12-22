type AddressType = "Home" | "Work" | "Office" | "Other";
export type IAddress = {
  _id?: string;
  country: "bangladesh";
  fullName: string;
  phoneNumber: string;
  landmark: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  policeStation: string;
  addressType: AddressType;
  isDefault: boolean;
  user: string | object;
};
