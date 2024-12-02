import ProductCard from "@/components/products/product-card";
import ProductSkeletons from "@/components/ui/skeletons/product-skeletons";
import { IProducts } from "@/interfaces/products.interfaces";
import { useGetProductsQuery } from "@/store/services/productsApiSlice";

const Wishlist = () => {
  const { data, isLoading } = useGetProductsQuery("");

  if (isLoading) return <ProductSkeletons xl={3} />;

  return (
    <div>
      <div className=" w-full grid lg:grid-cols-3 grid-cols-2 gap-4 ">
        {data?.data?.map((product: IProducts) => (
          <ProductCard key={product._id} products={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
