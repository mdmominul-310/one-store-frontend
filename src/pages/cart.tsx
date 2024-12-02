import CartItems from "@/components/carts/cart-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/useCart";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = (): JSX.Element => {
  const navigation = useNavigate();
  const handleCheckout = () => {
    navigation("/checkout");
  };
  const { cart, totalSelectedItems, totalSelectedPrice } = useCart();
  // const onChange: CheckboxProps['onChange'] = () => {
  //     addAllSelected()
  // }
  ReactPixel.pageView(); // For tracking page view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container my-4 min-h-screen">
      <h2 className="my-5 text-3xl pb-2 font-semibold border-b-[1px]">
        Your Cart
      </h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="grid lg:col-span-8 col-span-12 bg-gray-100 py-3 px-4">
          <h1 className="text-sm text-gray-800">Product(s)</h1>
          {/* <div className="flex items-center justify-between p-3 shadow-md">
                        <Checkbox onChange={onChange} checked={isSelectedAll}>SELECT ALL ITEMS</Checkbox>
                        <button className="flex items-center gap-2 hover:text-primary"> <MdDelete /> DELETE</button>
                    </div> */}
          {cart.map((cartItem, index) => (
            <CartItems key={index} cartItems={cartItem} />
          ))}
        </div>

        <div className="grid lg:col-span-4 col-span-12 h-[270px] bg-gray-100 p-3">
          <div className=" shadow p-3 rounded bg-white ">
            <h5 className="text-center mb-3 pb-2 text-lg font-semibold border-b-[1px]">
              Order Summary
            </h5>
            <h4 className="flex justify-between my-2">
              <span>Subtotal ({totalSelectedItems} items)</span>{" "}
              <span>${totalSelectedPrice}</span>
            </h4>
            <div className="flex">
              <Input placeholder="Enter Coupon" type="text" className="h-10" />
              <Button className="bg-primary   ml-2 text-white">Apply</Button>
            </div>
            <h4 className="flex justify-between my-2">
              <span>Total</span>
              <span>${totalSelectedPrice}</span>
            </h4>
            <button
              className="bg-primary font-semibold text-white rounded hover:bg-secondary duration-300 p-2 w-full my-2"
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT ({totalSelectedPrice})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
