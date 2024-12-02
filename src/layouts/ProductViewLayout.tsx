import ProductView from "@/components/products/product-view";
import { useEffect } from "react";

const ProductViewLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <ProductView />
    </div>
  );
};

export default ProductViewLayout;
