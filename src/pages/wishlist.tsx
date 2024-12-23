import WishlistProductCard from "@/components/products/wishlist_product_card";
import useWishlist from "@/hooks/useWishlist";
import { ICarts } from "@/interfaces/carts.interface";

const Wishlist = () => {
  const { localWishlistProducts, modifiedStoredWishlistProducts } =
    useWishlist();

  return (
    <div>
      {[...localWishlistProducts, ...modifiedStoredWishlistProducts]?.length ? (
        <div className=" w-full grid lg:grid-cols-3 grid-cols-2 gap-4 ">
          {[...localWishlistProducts, ...modifiedStoredWishlistProducts]?.map(
            (product: ICarts) => (
              <WishlistProductCard key={product?.id} products={product} />
            )
          )}
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
