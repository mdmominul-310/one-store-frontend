import useCart from "@/hooks/useCart";
import { ICarts } from "@/interfaces/carts.interface";
import { cn } from "@/lib/utils";

type CartItemsProps = {
  cartItems: ICarts;
  flat?: boolean;
};

const CartItems = ({ cartItems, flat }: CartItemsProps) => {
  const { addQuantity, reduceQuantity, countDiscount, removeToCart } =
    useCart();
  const discount = countDiscount(cartItems.price, cartItems.regularPrice);
  return (
    <div className="w-full">
      <div className="bg-slate-50 shadow my-2 p-3 w-full flex rounded    duration-300">
        {/* <Checkbox onChange={onChange} checked={isSelected} className=" w-[20px]  ">
                </Checkbox> */}
        <div className="w-full">
          <div className="flex gap-6">
            <div>
              <img
                src={cartItems?.image}
                className={cn("w-[150px]", { "w-[50px]": flat })}
                alt=""
              />
            </div>
            <div className={cn("flex flex-col gap-2", { block: flat })}>
              <div>
                <h4 className="font-[500]">{cartItems?.title}</h4>
                {/* <h5 className="my-1 font-medium text-gray-500"> Cature, Weight 100 gm</h5> */}
                {/* <h6 className="text-xs">Only items in stock</h6> */}
              </div>
              <div className="flex items-baseline gap-1 font-semibold text-md">
                {/* sale price  */}
                <span className="text-xl">৳{cartItems.price}</span>
                <span className={cn("my-1 block", { block: flat })}>
                  <del className="text-xs text-rose-600">
                    ৳{cartItems.regularPrice}
                  </del>
                </span>
              </div>
              <span className={cn("block text-slate-500", { hidden: flat })}>
                -{discount}% off
              </span>
              {/* cart quantity  */}
              <div
                className={cn("md:flex gap-4 items-center font-semibold", {
                  flex: flat,
                })}
              >
                {flat ? (
                  <div className="flex items-center  gap-4 border-[1px]  ">
                    <div>
                      <button
                        onClick={() => reduceQuantity(cartItems.id)}
                        className="border-r-[1px] px-2 py-2"
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <p className="text-center w-[5px]">{cartItems.qty}</p>
                    </div>
                    <button
                      onClick={() => addQuantity(cartItems.id)}
                      className="border-l-[1px] px-2 py-2"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="border-[1px] w-[120px]  flex items-center border-slate-200">
                    <button
                      className="px-4 py-1 text-xl  hover:bg-primary hover:text-white border-r-[1px] border-slate-200"
                      onClick={() => reduceQuantity(cartItems.id)}
                    >
                      -
                    </button>
                    <p className=" text-center w-[40px]">{cartItems?.qty}</p>
                    <button
                      className=" px-4 py-1 text-xl  hover:bg-primary hover:text-white border-l-[1px] border-slate-200 "
                      onClick={() => addQuantity(cartItems.id)}
                    >
                      +
                    </button>
                  </div>
                )}
                {flat ? (
                  <div className="md:flex  gap-1 text-xl items-center my-2">
                    <button className=" px-2 py-1 text-[15px]  font-light   hover:bg-primary hover:text-white border-[1px] border-slate-200">
                      Save
                    </button>
                    <button
                      className=" px-2 mt-2 md:mt-0 py-1 text-[15px]  font-light   hover:bg-primary hover:text-white border-[1px] border-slate-200"
                      onClick={() => removeToCart(cartItems.id)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="md:flex  gap-4 text-xl items-center my-2">
                    <button className="md:px-10 px-11 py-1 text-[15px]  font-light   hover:bg-primary hover:text-white border-[1px] border-slate-200">
                      Save
                    </button>
                    <button
                      className="md:px-10 px-8 mt-2 md:mt-0 py-1 text-[15px]  font-light   hover:bg-primary hover:text-white border-[1px] border-slate-200"
                      onClick={() => removeToCart(cartItems.id)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
