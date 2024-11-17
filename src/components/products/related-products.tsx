import { useGetProductsQuery } from "@/store/services/productsApiSlice";
import ProductCard from "./product-card"
import { IProducts } from "@/interfaces/products.interfaces";

const RelatedProducts = () => {
    const { data, isLoading } = useGetProductsQuery({});

    if (isLoading) return <div>Loading...</div>
    return (
        <div className="my-4">
            <h2 className="my-4 font-semibold text-xl">Related Products</h2>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 my-4 '>
                {
                    data?.data?.map((product: IProducts, index: number) => (
                        <ProductCard key={index} products={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts;