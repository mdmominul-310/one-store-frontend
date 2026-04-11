import { useAppSelector } from "@/store/app/hooks";
import useAuth from "./useAuth";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetUserWishlistQuery,
} from "@/store/services/wishlistApiService";
import { IProducts } from "@/interfaces/products.interfaces";
import { useDispatch } from "react-redux";
import { addWishList, removeWishList } from "@/store/features/wishListSlice";
import UseCustomToast from "./UseCustomToast";
import toast from "react-hot-toast";
import { ICarts } from "@/interfaces/carts.interface";

const useWishlist = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { data } = useGetUserWishlistQuery({ id: user.id });
  const storedWishlistProducts = data?.data || [];
  const [removeWishlistProduct] = useDeleteWishlistMutation();
  const [addToWishList] = useAddWishlistMutation();

  const modifiedStoredWishlistProducts = storedWishlistProducts?.map(
    (item: { _id: string; product: IProducts }) => {
      const product = item?.product;
      return {
        id: product?.id as string,
        _id: item?._id as string,
        title: product?.title,
        price: parseInt(product?.stock?.[0]?.salePrice) as number,
        image: product?.images?.[0],
        qty: 1,
        regularPrice: parseInt(product?.stock?.[0]?.regularPrice) as number,
        selected: true,
      };
    }
  );

  const localWishlistProducts = useAppSelector(
    (state) => state.local.wishlistReducer.wishListInfo
  );

  const isWishlistExist = (id: string) => {
    return (
      localWishlistProducts.find((prod) => prod?.id == id) ||
      storedWishlistProducts.find(
        (prod: { _id: string; product: IProducts }) => prod.product?.id == id
      )
    );
  };

  const handleRemoveFromWishlist = async (id: string) => {
    const isExist = localWishlistProducts.find((prod) => prod?.id == id);
    const isWishlist = isWishlistExist(id as string);
    if (isExist) {
      dispatch(removeWishList({ id: isExist?.id }));
      toast.success("Removed from wishlist");
    } else {
      UseCustomToast(removeWishlistProduct(isWishlist?._id), "product removing");
    }
  };

  const handleAddToWishList = async (product: IProducts) => {
    if (user?.email) {
      const data = { product: product?.id, user: user?.id };
      UseCustomToast(addToWishList(data), "product adding to wishlist");
    } else {
      const wishlistInfo: ICarts = {
        id: product?._id as string,
        title: product?.title,
        price: parseInt(product?.stock?.[0]?.salePrice) as number,
        image: product?.images?.[0],
        qty: 1,
        regularPrice: parseInt(product?.stock?.[0]?.regularPrice) as number,
        selected: true,
      };
      dispatch(addWishList(wishlistInfo));
      toast.success("Added to wishlist");
    }
  };

  return {
    localWishlistProducts,
    storedWishlistProducts,
    modifiedStoredWishlistProducts,
    isWishlistExist,
    handleRemoveFromWishlist,
    handleAddToWishList,
  };
};

export default useWishlist;
