import EditProfile from "@/components/profile/EditProfile";
import useAuth from "@/hooks/useAuth";
import { IOrders } from "@/interfaces/orders.interface";
import { useGetUserOrdersQuery } from "@/store/services/orderApiSlice";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useAuth();

  const { data } = useGetUserOrdersQuery({ id: user?.id });
  const orders: IOrders[] = data?.data || [];
  const details = [
    { label: "first name", value: user.firstName },
    { label: "last name", value: user.lastName },
    { label: "email", value: user.email },
    { label: "phone", value: user.phone },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="size-9 flex items-center justify-center rounded-full text-[#D23F57] bg-[#f5f9ff]">
            <FaRegUser />
          </span>
          {isEditable ? "Edit" : "My"} Profile
        </h2>
        <button
          onClick={() => setIsEditable(!isEditable)}
          className="px-5 py-1 bg-[#ffe9ec] text-[#D23F57] text-sm rounded-md"
        >
          Edit Profile
        </button>
      </div>
      <>
        {isEditable ? (
          <div className="my-5 shadow px-4 py-2">
            <EditProfile />
          </div>
        ) : (
          <>
            {" "}
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="shadow px-4 py-2 flex items-center justify-between xl:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-300 rounded-md size-[60px]">
                    <img
                      className="size-[60px] rounded-full"
                      src={user?.profileImage}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4>
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <p className="uppercase text-sm text-[#7d879c] text-start">
                      Silver User
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="shadow px-4 py-5 flex flex-col items-center">
                  <span className="text-red-600 font-semibold text-lg">
                    {orders.length}
                  </span>
                  <p className="text-center text-[13px] text-[#7d879c]">
                    All Orders
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow px-4 py-5 mt-5 flex flex-col gap-5 md:flex-row md:justify-between">
              {details.map((item) => (
                <div key={item.label}>
                  <p className="text-sm capitalize text-[#7d879c] mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Profile;
