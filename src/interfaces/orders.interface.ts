import { IOrderProduct } from "./products.interfaces";
import { IUser } from "./user.interface";

export type ICarts = {
  id: string;
  title: string;
  price: number;
  regularPrice: number;
  image: string;
  qty: number;
  selected?: boolean;
  status?: string;
  attributes?: { [key: string]: string }[];
};

export type IOrders = {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  deliveryArea: string;
  deliveryCharge?: string;
  note?: string;
  user?: string;
  products: ICarts[];
  status?: string;
  total: string;
};

export type IFetchOrders = {
  _id: string;
  fullName: string;
  user: IUser;
  phoneNumber: string;
  address: string;
  deliveryArea: string;
  deliveryCharge: string;
  total: string;
  note: string;
  products: IOrderProduct[];
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
