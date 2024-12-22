export type ICarts = {
  id: string;
  _id?: string;
  title: string;
  price: number;
  regularPrice: number;
  image: string;
  qty: number;
  selected?: boolean;
  attributes?: { [key: string]: string }[];
};
