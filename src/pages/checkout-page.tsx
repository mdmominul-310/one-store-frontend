/* eslint-disable react-hooks/exhaustive-deps */
import CartItems from "@/components/carts/cart-items";
import useCart from "@/hooks/useCart";
import { IOrders } from "@/interfaces/orders.interface";
import { useAddOrderMutation } from "@/store/services/orderApiSlice";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import COD from "../assets/cod.png";
import useAuth from "@/hooks/useAuth";
import GuestOrUserConfirmation from "@/components/GuestOrUserConfirmaiton/GuestOrUserConfirmation";
import { useAppSelector } from "@/store/app/hooks";
import { useGetAddressesQuery } from "@/store/services/addressApiService";
import { IAddress } from "@/interfaces/address.interface";
import toast from "react-hot-toast";

type FieldType = {
  fullName: string;
  phoneNumber?: string;
  remember?: string;
  address: string;
  note?: string;
  deliveryArea: string;
};

const CheckoutPage = () => {
  const { user } = useAuth();
  const [activeAddress, setActiveAddress] = useState<IAddress | null>(null);
  const { data: addressData } = useGetAddressesQuery({});
  const addresses: IAddress[] = addressData?.data;
  const confirmationStatus = useAppSelector(
    (state) => state.local.guestOrUserConfirmationReducer.confirmed
  );
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const { selectedItems, totalItems, totalSelectedPrice, clearToCart } =
    useCart();
  const [addOrder, { data, isLoading, isError }] = useAddOrderMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigation = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const selectedAddress = activeAddress
      ? activeAddress
      : addresses?.find((address) => address.isDefault);
    if (!selectedAddress) {
      toast.error("Please select an address");
    }

    const orderInfo: IOrders = {
      fullName: (user ? selectedAddress?.fullName : values?.fullName) as string,
      phoneNumber: (user
        ? selectedAddress?.phoneNumber
        : values?.phoneNumber) as string,
      address: (user ? selectedAddress?.landmark : values?.address) as string,
      deliveryArea: (user
        ? selectedAddress?.city.toLowerCase() === "dhaka"
          ? "Inside Dhaka"
          : "Outside Dhaka"
        : values?.deliveryArea) as string,
      user: user?.id as string,
      note: values?.note || ("" as string),
      products: selectedItems,
      total: (totalSelectedPrice + deliveryCharge).toString(),
      deliveryCharge: deliveryCharge.toString(),
    };

    addOrder(orderInfo);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (data) {
      if (data.data) {
        messageApi.success("Order has been placed successfully");
        clearToCart();
        navigation("/order-success");
      }
    }
    if (isError) {
      messageApi.error("Something went wrong");
    }
  }, [data, isError, messageApi, navigation]);

  ReactPixel.pageView(); // For tracking page view

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container min-h-screen">
        {contextHolder}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          initialValues={{
            remember: true,
            fullName: user?.firstName
              ? `${user?.firstName} ${user?.lastName}`
              : "",
            email: user?.email ? user?.email : "",
            phoneNumber: user?.phone ? user?.phone : "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <h1 className=" border-b-2 border-primary py-5 text-3xl">CHECKOUT</h1>
          <div className="grid grid-cols-12 gap-8">
            <div className="lg:col-span-7 col-span-12">
              <h2 className="border-b-2 my-5 pb-2">
                DELIVERY AND BILLING INFO
              </h2>

              {user.email ? (
                <div>
                  <Link
                    to={"/"}
                    className="my-5 pb-2 text-right text-primary cursor-pointer block"
                  >
                    Add Address +
                  </Link>
                  <div className="grid grid-cols-2 gap-5">
                    {addresses?.length
                      ? addresses.map((address, idx) => (
                          <div
                            onClick={() => setActiveAddress(address)}
                            key={idx}
                            className={`border-2 rounded-md p-3 text-start cursor-pointer ${
                              address?._id === activeAddress?._id ||
                              (!activeAddress && address.isDefault)
                                ? "border-blue-500 bg-blue-50"
                                : ""
                            } `}
                          >
                            <h4 className="font-semibold text-xl">Address</h4>
                            <p className="font-semibold text-[17px]">
                              {address.addressType}
                            </p>
                            <p>{address.fullName}</p>
                            <p>{address.phoneNumber}</p>
                            <p>{address.city}</p>
                            <p>{address.landmark}</p>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="">
                    <div className="flex gap-4">
                      <Form.Item<FieldType>
                        label="Full Name"
                        name="fullName"
                        className="w-full"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input
                          className="w-full h-11"
                          placeholder="Customer Name"
                        />
                      </Form.Item>

                      <Form.Item<FieldType>
                        label="Phone Number"
                        name="phoneNumber"
                        className="w-full"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Number!",
                          },
                        ]}
                      >
                        <Input
                          className="w-full h-11"
                          placeholder="Phone Number"
                        />
                      </Form.Item>
                    </div>

                    <Form.Item<FieldType>
                      label="Address"
                      name={"address"}
                      rules={[
                        {
                          required: true,
                          message: "Please input your Address!",
                        },
                      ]}
                    >
                      <Input
                        className="w-full h-11"
                        placeholder="Shipping Address"
                      />
                    </Form.Item>
                    <Form.Item<FieldType>
                      label="Delivery Area"
                      name={"deliveryArea"}
                      rules={[
                        {
                          required: true,
                          message: "Please input your Delivery Area!",
                        },
                      ]}
                    >
                      <Select
                        onChange={(e) => {
                          if (e === "insideDhaka") {
                            setDeliveryCharge(70);
                          } else {
                            setDeliveryCharge(130);
                          }
                        }}
                        className="w-full h-11"
                        placeholder="Select Delivery Area"
                      >
                        <Select.Option value="insideDhaka">
                          Inside Dhaka
                        </Select.Option>
                        <Select.Option value="outSideDhaka">
                          Outside Dhaka
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Note (Optional)"
                      name={"note"}
                      rules={[
                        {
                          required: false,
                          message: "Please input your Order Note !",
                        },
                      ]}
                    >
                      <Input.TextArea
                        className="w-full"
                        placeholder="Aditional Information (Anything you want to add)"
                      />
                    </Form.Item>
                  </div>
                </div>
              )}

              <div>
                <h4 className="border-b-2 my-5 pb-2">PAYMENT METHOD</h4>
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 mr-5"
                    value="N"
                    checked
                  />{" "}
                  <span>Cash On Delivery</span>
                </div>
                <img src={COD} alt="" className="h-20 w-48 mt-4" />
              </div>
            </div>
            <div className="lg:col-span-5 col-span-12">
              <h2 className="mt-5 border-b-2 pb-2">ORDER OVERVIEW</h2>
              <h2 className="mb-5 mt-2 border-b-2 pb-2">
                YOUR CART: {totalItems} ITEMS
              </h2>

              <div className="h-[350px]  overflow-y-scroll">
                {selectedItems.map((item, index) => (
                  <CartItems key={index} cartItems={item} />
                ))}
              </div>
              <div className="flex justify-between my-2 border-b-[1px] py-2 border-t-[1px] mt-5 ">
                <span>Subtotal</span>
                <span>৳{totalSelectedPrice}</span>
              </div>
              <div className="flex justify-between my-2 border-b-[1px] pb-2">
                <span>Delivery Charge</span>
                <span>৳{deliveryCharge}</span>
              </div>
              <div className="flex justify-between my-2 mb-5">
                <span>Total</span>
                <span>৳{totalSelectedPrice + deliveryCharge}</span>
              </div>
              <div className="flex items-center my-2">
                <Input
                  placeholder="Enter Coupon"
                  type="text"
                  className="h-11"
                />
                <Button className="bg-primary text-white h-11 ml-2">
                  Apply
                </Button>
              </div>

              <button className="bg-primary font-semibold text-white rounded hover:bg-secondary duration-300 p-2 w-full my-5">
                PLACE ORDER
              </button>
            </div>
          </div>
        </Form>
        <Spin fullscreen spinning={isLoading} />
      </div>
      {!user.email && !confirmationStatus ? <GuestOrUserConfirmation /> : ""}
    </>
  );
};
export default CheckoutPage;
