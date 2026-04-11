import { IFetchOrders } from "@/interfaces/orders.interface";
import { useGetSingleOrderByOrderIdQuery } from "@/store/services/orderApiSlice";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { id } = useParams();
  const { data } = useGetSingleOrderByOrderIdQuery(id);
  const order: IFetchOrders = data?.data?.[0];
  const {
    email,
    profileImage,
    firstName,
    lastName,
    role,
    status: userStatus,
    emailVerified,
    phone,
    phoneNumberVerified,
  } = order?.user || {};
  const products = order?.products;
  let stepItems = [
    {
      title: "Pending",
    },
    {
      title: "Processing",
    },
    {
      title: "Shipped",
    },
    {
      title: "Delivered",
    },
  ];
  if (order?.status === "cancel") {
    stepItems = [
      {
        title: "Pending",
      },

      {
        title: "Cancelled",
      },
    ];
  }

  useEffect(() => {
    if (order) {
      if (order?.status === "pending") setCurrentStep(0);
      if (order?.status === "processing") setCurrentStep(1);
      if (order?.status === "shipped") setCurrentStep(2);
      if (order?.status === "delivered") setCurrentStep(3);
      if (order?.status === "cancel") setCurrentStep(1);
    }
  }, [order]);

  return (
    <div className="mx-auto bg-white rounded-md text-start">
      <div className="text-center pb-5">
        <Steps progressDot current={currentStep} items={stepItems} />
      </div>
      <section className="mb-6 border p-2 shadow rounded-sm">
        <div className=" mx-auto overflow-hidden ">
          <div className="flex items-center pb-3">
            <img
              src={profileImage}
              alt={`${firstName} ${lastName}`}
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <div className="ml-4">
              <div className="text-lg font-semibold flex items-center gap-3 capitalize">
                {firstName} {lastName}{" "}
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${
                    userStatus === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {userStatus}
                </span>
              </div>
              <p className="text-sm text-gray-500 capitalize">{role}</p>
            </div>
          </div>

          <div className=" p-3 border-t">
            <p className="text-sm">
              <strong>Email:</strong> {email}{" "}
              {emailVerified ? (
                <span className="ml-2 text-green-600 font-medium">
                  (Verified)
                </span>
              ) : (
                <span className="ml-2 text-red-600 font-medium">
                  (Not Verified)
                </span>
              )}
            </p>
            <p className="text-sm mt-2">
              <strong>Phone:</strong> {phone}{" "}
              {phoneNumberVerified ? (
                <span className="ml-2 text-green-600 font-medium">
                  (Verified)
                </span>
              ) : (
                <span className="ml-2 text-red-600 font-medium">
                  (Not Verified)
                </span>
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="mb-6">
        {products?.map((product, idx) => {
          const { image, title, regularPrice, price, attributes, qty } =
            product;
          return (
            <div
              key={idx}
              className="flex items-center justify-between gap-5 border p-2 shadow rounded-sm"
            >
              {/* Product Image */}
              <img
                src={image}
                alt={title}
                className="w-16 h-16 object-cover rounded-md border"
              />

              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-500">
                <span className="line-through text-red-500 mr-2">
                  ${regularPrice.toFixed(2)}
                </span>
                <span>${price.toFixed(2)}</span>
              </p>
              {/* Attributes */}
              <div className="mt-1 flex gap-2 text-sm text-gray-600">
                {attributes.map((attr) => (
                  <span
                    key={attr._id}
                    className="px-2 py-1 bg-gray-200 rounded-md text-xs font-medium"
                  >
                    {attr.key}: {attr.value}
                  </span>
                ))}
              </div>

              {/* Quantity */}
              <div className="text-sm font-medium">
                Qty: <span>{qty}</span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default OrderDetails;
