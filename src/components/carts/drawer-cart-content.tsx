import { ICarts } from "@/interfaces/carts.interface";
import CartItems from "./cart-items";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const DrawerCartContent = ({
  carts,
  setShowDrawer,
}: {
  carts: ICarts[];
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigation = useNavigate();
  const handleCheckout = () => {
    navigation("/checkout");
    setShowDrawer(false);
  };
  if (!carts.length) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="">
          <div className="bg-primary w-20 h-20 rounded-full flex justify-center items-center mx-auto mb-2">
            <FaShoppingBag className="text-white text-4xl" />
          </div>
          <h3 className="text-2xl font-semibold">No Items in Cart</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      {carts.map((cart, index) => (
        <CartItems key={index} cartItems={cart} flat={true} />
      ))}
      <div className="absolute bottom-4 w-ful left-32">
        <button
          className="bg-primary flex gap-2 w-full p-2 rounded text-white"
          onClick={handleCheckout}
        >
          <h3 className="font-semibold ">Checkout</h3>
          <h3 className="font-semibold ">
            Total: ৳
            {carts.reduce((acc, item) => acc + item.price * item.qty, 0)}
          </h3>
        </button>
      </div>
    </div>
  );
};

export default DrawerCartContent;
