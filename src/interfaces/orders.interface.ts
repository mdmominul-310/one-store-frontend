export type ICarts = {
  id: string;
  title: string;
  price: number;
  regularPrice: number;
  image: string;
  qty: number;
  selected?: boolean;
  status?: string,
  attributes?: { [key: string]: string }[];
};

export type IOrders = {
  fullName: string;
  phoneNumber: string;
  address: string;
  deliveryArea: string;
  deliveryCharge?: string;
  note?: string;
  products: ICarts[];
  status?: string;
  total: string;
};
