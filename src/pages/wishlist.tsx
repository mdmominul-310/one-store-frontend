import WishlistProductCard from "@/components/products/wishlist_product_card";
import useAuth from "@/hooks/useAuth";
import { ICarts } from "@/interfaces/carts.interface";
import { IProducts } from "@/interfaces/products.interfaces";
import { useAppSelector } from "@/store/app/hooks";
import { useGetUserWishlistQuery } from "@/store/services/wishlistApiService";

const Wishlist = () => {
  const { user } = useAuth();
  const products = useAppSelector(
    (state) => state.local.wishlistReducer.wishListInfo
  );

  const { data } = useGetUserWishlistQuery({ id: user.id });
  const storedWishlistData = data?.data || [];
  const storedWishlist = storedWishlistData?.map((item: {_id: string, product: IProducts}) => {
    const product = item?.product;
    return {
      id: product?.id as string,
      title: product?.title,
      price: parseInt(product?.stock?.[0]?.salePrice) as number,
      image: product?.images?.[0],
      qty: 1,
      regularPrice: parseInt(product?.stock?.[0]?.regularPrice) as number,
      selected: true,
    };
  })

  return (
    <div>
      {[...products, ...storedWishlist]?.length ? (
        <div className=" w-full grid lg:grid-cols-3 grid-cols-2 gap-4 ">
          {[...products, ...storedWishlist]?.map((product: ICarts) => (
            <WishlistProductCard key={product.id} products={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg font-medium py-20">
          No products found.
        </div>
      )}
    </div>
  );
};

export default Wishlist;
