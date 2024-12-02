import { useParams } from "react-router-dom";

import ProductSpecifications from "./product-specifications";
import RelatedProducts from "./related-products";
import { useGetProductBySlugQuery } from "@/store/services/productsApiSlice";
import ProductViewCard from "./product-view-card";
import ProductSkeletons from "../ui/skeletons/product-skeletons";
// import MyGallery from "./product-image-gellery";

function CustomPaging() {
  const slug = useParams().slug;
  const { data, isLoading } = useGetProductBySlugQuery(slug);

  if (isLoading) return <ProductSkeletons />;
  return (
    <div>
      <ProductViewCard product={data?.data} />
      <div className="my-10">
        <ProductSpecifications product={data?.data} />
      </div>
      <div>
        <RelatedProducts />
      </div>
    </div>
  );
}

export default CustomPaging;
