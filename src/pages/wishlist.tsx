import WishlistProductCard from "@/components/products/wishlist_product_card";
import { ICarts } from "@/interfaces/carts.interface";
import { useAppSelector } from "@/store/app/hooks";
import { useGetUserWishlistQuery } from "@/store/services/wishlistApiService";

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.local.userReducer.userInfo);
  const products = useAppSelector(
    (state) => state.local.wishlistReducer.wishListInfo
  );

  console.log({ user });

  const { data } = useGetUserWishlistQuery({ id: user.id });
  console.log({ data });

  return (
    <div>
      {products?.length ? (
        <div className=" w-full grid lg:grid-cols-3 grid-cols-2 gap-4 ">
          {products?.map((product: ICarts) => (
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
