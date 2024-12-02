import { IProducts } from "@/interfaces/products.interfaces";
import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductViewCard from "./product-view-card";

const ProductCard = ({ products }: { products: IProducts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigaton = useNavigate();
  // const { isExist } = useCart();
  // const dispatch = useDispatch();
  const handleproduct = () => {
    navigaton(`/products/${products?.slug}`);
    window.scrollTo(0, 0);
  };
  // const handleAddToCart = () => {
  //     const cartInfo: ICarts = {
  //         id: products?._id as string,
  //         title: products?.title,
  //         price: parseInt(products?.stock?.[0]?.salePrice) as number,
  //         image: products?.images?.[0],
  //         qty: 1,
  //         regularPrice: parseInt(products?.stock?.[0]?.regularPrice) as number,
  //         selected: true
  //     }
  //     dispatch(addCart(cartInfo));
  // }
  // const isCart = isExist(products?._id as string);

  return (
    <>
      <div className="shadow-lg  rounded-lg relative group bg-white ">
        <div onClick={handleproduct}>
          <div className="overflow-hidden">
            <img
              src={products?.images?.[0]}
              alt="product"
              className="hover:scale-125 transition duration-500 rounded-t-lg"
            />
          </div>
          <div className="px-2">
            {/* product title  */}
            <h3 className="font-[500] text-md  hover:text-primary">
              {products?.title}
            </h3>
            <div className="flex justify-between font-semibold text-primary">
              {/* product sale price */}
              <p>৳{products?.stock?.[0]?.salePrice}</p>
              <p>
                <del>{products?.stock?.[0]?.regularPrice}৳</del>
              </p>
            </div>
          </div>
          <div className="bg-primary absolute top-1 left-0 px-2 py-1 text-xs rounded text-white font-semibold">
            save{" "}
            {Math.floor(
              ((parseInt(products?.stock?.[0]?.regularPrice) -
                parseInt(products?.stock?.[0]?.salePrice)) /
                parseInt(products?.stock?.[0]?.regularPrice)) *
                100
            )}{" "}
            %
          </div>
        </div>
        {/* <div className="bg-primary absolute top-4 hidden group-hover:block right-2 p-2 rounded">
                    
                    <button
                        className="mt-2 bg-primary text-white font-semibold py-2 rounded text-2xl block "
                        onClick={() => setIsModalVisible(true)}
                    >
                        <FaCartArrowDown className="hover:text-secondary"
                            style={{ color: isCart ? 'green' : 'white', transition: 'all 0.3s ease' }}
                        />
                    </button>
                    <button className="mt-2 bg-primary text-white font-semibold py-2 rounded text-2xl block" onClick={() => setIsModalVisible(true)}
                    ><FaHeart className="hover:text-secondary" /></button>
                    <button className="mt-2 bg-primary text-white font-semibold py-2 rounded text-2xl block"
                        onClick={() => setIsModalVisible(true)}
                    ><FaEye className="hover:text-secondary" /></button>

                </div> */}
        <div className="py-2 px-2">
          <button
            className="bg-primary w-full font-semibold text-white hover:bg-secondary py-1 rounded"
            onClick={() => setIsModalVisible(true)}
          >
            Add Cart
          </button>
        </div>
      </div>

      <Modal
        footer={null}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
      >
        <ProductViewCard
          product={products}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </>
  );
};

export default ProductCard;
