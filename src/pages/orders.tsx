import useAuth from "@/hooks/useAuth";
import { IOrders } from "@/interfaces/orders.interface";
import { useGetUserOrdersQuery } from "@/store/services/orderApiSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiShoppingBag } from "react-icons/hi";

const Orders = () => {
  const { user } = useAuth();
  const { data } = useGetUserOrdersQuery({ id: user?.id });
  const orders: IOrders = data?.data || [];

  return (
    <div>
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="size-9 flex items-center justify-center rounded-full text-[#D23F57] bg-[#f5f9ff] ">
            <HiShoppingBag />
          </span>
          My Orders
        </h2>
      </div>
      {orders?.products?.length ? (
        <div className="grid grid-cols-1 gap-5 py-5">
          {orders?.products?.map((order, idx) => (
            <div
              key={idx}
              className="grid grid-cols-6 items-center justify-between gap-5 shadow px-4 py-5 rounded-sm"
            >
              <div className="col-span-2">#{order.id}</div>
              <div className="flex  justify-between ">
                <span
                  className={`text-[13px] capitalize px-3 pb-0.5 rounded-full mx-auto ${
                    order?.status === "pending"
                      ? "bg-slate-200 text-slate-700"
                      : order?.status === "processing"
                      ? "bg-blue-500 text-white"
                      : order?.status === "cancelled"
                      ? "bg-red-500 text-white"
                      : order?.status === "delivered"
                      ? "bg-green-100 text-green-500"
                      : ""
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <span className="text-sm text-center">{order.regularPrice}</span>
              <span className="text-sm text-center">${order.price}</span>
              <span className="text-[#7d879c] text-end  flex items-center justify-end">
                <FaArrowRightLong />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg font-medium py-20">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default Orders;
