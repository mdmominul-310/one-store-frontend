import { IAttribute, IProducts } from "@/interfaces/products.interfaces";
import ProductImageGellery from "./product-image-gellery";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

const ProductViewCard = ({
  product,
  setIsModalVisible,
}: {
  product: IProducts;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState<number>(1);
  // manage attributes data like color, size, etc
  const [attributes, setAttributes] = useState<
    {
      [key: string]: string;
    }[]
  >(
    product.attributes
      ?.map((attr) => {
        if (attr.enable) {
          return { key: attr.name, value: attr.values[0].title };
        }
        return { key: "", value: "" };
      })
      .filter((att) => att.key !== "")
  );
  // manage attributes data like color, size, etc
  const handleAttributes = (name: string, value: string) => {
    const isNameExist = attributes.find((att) => att.key === name);
    if (isNameExist) {
      setAttributes(
        attributes.map((att) => (att.key === name ? { ...att, value } : att))
      );
    } else {
      setAttributes([...attributes, { key: name, value }]);
    }
  };
  const isAttributeExist = (name: string, value: string) => {
    return attributes.find((att) => att.key === name && att.value === value);
  };

  const handleCart = () => {
    const variant = attributes.map((att) => att.value).join(">>");

    const prices = product.stock?.find((stock) => stock.variant === variant);
    const cartInfo = {
      id: product._id as string,
      title: product.title,
      price: parseFloat(prices?.salePrice as string),
      regularPrice: parseFloat(prices?.regularPrice as string),
      image: product.images[0],
      qty: qty,
      selected: true,
      attributes: attributes,
    };
    addToCart(cartInfo);
    setIsModalVisible?.(false);
  };

  const handleBuyNow = () => {
    const variant = attributes.map((att) => att.value).join(">>");

    const prices = product.stock?.find((stock) => stock.variant === variant);
    const cartInfo = {
      id: product._id as string,
      title: product.title,
      price: parseFloat(prices?.salePrice as string),
      regularPrice: parseFloat(prices?.regularPrice as string),
      image: product.images[0],
      qty: qty,
      selected: true,
      attributes: attributes,
    };
    addToCart(cartInfo);
    setIsModalVisible?.(false);

    navigate("/cart");
  };

  return (
    <div className=" block  lg:flex justify-between gap-4 overflow-hidden">
      <div className="w-full basis-1/2">
        <ProductImageGellery images={product.images} />
      </div>
      <div className="w-full lg:w-1/2 inline-block shadow md:p-4 basis-1/2">
        {/* title  */}
        <h2 className="font-semibold  text-2xl ">{product.title}</h2>
        {/* sku  */}
        <h4 className=" text-xs text-gray-400">
          SKU: {product.stock?.[0].sku}{" "}
        </h4>
        <h3 className="flex  items-baseline gap-2 text-primary border-b-2 pb-4 mb-4 mt-2">
          {/* sale price  */}

          <span className="text-3xl font-normal ">
            TK.{product.stock?.[0].salePrice}{" "}
          </span>
          <p className="font-semibold  text-secondary flex ">
            <del>TK.{product.stock?.[0].regularPrice} </del>
          </p>
        </h3>

        {/* attributes  */}
        <div className="border-b-2  pb-4 mb-6">
          {product.attributes?.map((attr: IAttribute, index: number) => {
            if (!attr.enable) return null;
            // console.log(selectedAtt);
            return (
              <div key={index}>
                <h4 className="mb-1 mt-3">{attr.name}: </h4>
                <div className="flex">
                  {attr.values.map((value, index) => {
                    const selectedAtt = isAttributeExist(attr.name, value.title);

                    return (
                      <span
                        className={cn(
                          "px-4 py-1 mb-2 hover:bg-primary rounded ml-1 hover:text-white  border-1 border-primary border cursor-pointer",
                          {
                            "bg-primary text-white":
                              selectedAtt?.value === value.title,
                          }
                        )}
                        onClick={() => handleAttributes(attr.name, value.title)}
                        key={index}
                      >
                        {value.title}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex text-white gap-4 my-4">
          {/* <Button className="w-full bg-secondary"
                        onClick={handleCart}
                    >Orders</Button> */}
          <div className="flex justify-center items-center md:gap-6 gap-1 ">
            <div className="border-[1px] rounded flex items-center border-primary">
              <button
                className="px-4 py-1 text-xl text-black hover:bg-primary hover:text-white border-r-[1px] border-primary"
                onClick={() => (qty > 1 ? setQty(qty - 1) : null)}
              >
                -
              </button>
              <span className="text-black w-[40px] text-center">{qty}</span>
              <button
                className="px-4 py-1 text-xl text-black  hover:bg-primary hover:text-white border-l-[1px] border-primary"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
            {/* <div className="flex items-center">
                            <button className="border-2 border-primary hover:bg-primary p-1 rounded-full text-black hover:text-white">
                                <MinusIcon className=" size-4"
                                    onClick={() => qty > 1 ? setQty(qty - 1) : null}
                                /></button>
                            <span className="text-black w-[30px] text-center">{qty}</span>
                            <button className="border-2 border-primary hover:bg-primary p-1 rounded-full text-black hover:text-white"
                                onClick={() => setQty(qty + 1)}
                            ><PlusIcon className=" size-4 " /></button>
                        </div> */}
          </div>
          <Button
            className="w-full border-[1px] bg-white text-black hover:text-white border-primary hover:bg-primary"
            onClick={handleCart}
          >
            Add To Cart
          </Button>
          <Button className="w-full hidden md:block" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>

        <div className="text-white ">
          <Button className="w-full md:hidden mb-2">Buy Now</Button>
          {/* <Button className="w-full">Click call :+8801712454900 </Button> */}
          <a href="tel:+8801712454900">
            <Button className="w-full">Click call :+8801712454900 </Button>
          </a>
        </div>

        {/* table for delivery details  */}
        <div className="my-4">
          <div className="flex justify-around border border-1 p-2 hover:bg-slate-300">
            <span>Delivery charge:</span>
            <span>Inside Dhaka-70 Tk</span>
          </div>
          <div className="flex justify-around border border-1 p-2 hover:bg-slate-300">
            <span>Delivery charge:</span>
            <span>Outside Dhaka-120 Tk</span>
          </div>
        </div>

        {/* products tags  */}
        <div className="flex gap-2">
          <h5>Tags</h5>
          <div className="flex gap-4">
            {product.tags?.map(
              (tag: { title: string; label: string }, index: number) => (
                <span
                  className="bg-primary px-1 rounded text-white hover:bg-secondary"
                  key={index}
                >
                  {tag.title}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewCard;
