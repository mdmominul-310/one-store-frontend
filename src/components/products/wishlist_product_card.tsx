import { FaHeart } from "react-icons/fa";
import useCart from "@/hooks/useCart";
import { ICarts } from "@/interfaces/carts.interface";
import { useDispatch } from "react-redux";
import { addCart, removeCart } from "@/store/features/cartSlice";
import useWishlist from "@/hooks/useWishlist";


const WishlistProductCard = ({ products }: { products: ICarts }) => {
  const dispatch = useDispatch();
  const { handleRemoveFromWishlist } = useWishlist();


  const { isExist } = useCart();

  const isCart = isExist(products?.id as string);

  const handleAddToCart = () => {
    const cartInfo: ICarts = {
      id: products?.id,
      title: products?.title,
      price: products?.price,
      image: products?.image,
      qty: 1,
      regularPrice: products?.regularPrice,
      selected: true,
    };
    if (isCart) {
      dispatch(removeCart(cartInfo));
    } else {
      dispatch(addCart(cartInfo));
    }
  };



  return (
    <>
      <div className="shadow-lg  rounded-lg relative group bg-white ">
        <div>
          <div className="overflow-hidden">
            <img
              src={products.image}
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
              <p>৳{products?.price}</p>
              <p>
                <del>{products.regularPrice}৳</del>
              </p>
            </div>
          </div>
          <div className="bg-primary absolute top-1 left-0 px-2 py-1 text-xs rounded text-white font-semibold">
            save{" "}
            {Math.floor(
              ((products.regularPrice - products.price) /
                products?.regularPrice) *
                100
            )}{" "}
            %
          </div>
        </div>
        <div className="bg-primary absolute top-4 hidden group-hover:block right-2 p-2 rounded">
          <button
            className=" bg-primary text-white font-semibold rounded text-2xl block"
            onClick={() => handleRemoveFromWishlist(products?._id as string)}
          >
            <FaHeart className="text-secondary" />
          </button>
        </div>
        <div className="py-2 px-2">
          <button
            className="bg-primary w-full font-semibold text-white hover:bg-secondary py-1 rounded"
            onClick={() => handleAddToCart()}
          >
            {isCart ? "Remove" : "Add"} Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default WishlistProductCard;
