import EditProfile from "@/components/profile/EditProfile";
import { useAppSelector } from "@/store/app/hooks";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useAppSelector((state) => state.local.userReducer.userInfo);
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
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="shadow px-4 py-2 flex items-center justify-between">
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
                    <p className="text-sm text-[#7d879c]">
                      Balance: <span className="text-red-500">$5,000.00</span>
                    </p>
                  </div>
                </div>
                <p className="uppercase text-sm text-[#7d879c]">Silver User</p>
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="shadow px-4 py-5 flex flex-col items-center">
                  <span className="text-red-600 font-semibold text-lg">16</span>
                  <p className="text-center text-[13px] text-[#7d879c]">
                    All Orders
                  </p>
                </div>
                <div className="shadow px-4 py-2 flex flex-col items-center">
                  <span className="text-red-600 font-semibold text-lg">02</span>
                  <p className="text-center text-[13px] text-[#7d879c]">
                    Awaiting Payments
                  </p>
                </div>
                <div className="shadow px-4 py-2 flex flex-col items-center">
                  <span className="text-red-600 font-semibold text-lg">00</span>
                  <p className="text-center text-[13px] text-[#7d879c]">
                    Awaiting Shipment
                  </p>
                </div>
                <div className="shadow px-4 py-2 flex flex-col items-center">
                  <span className="text-red-600 font-semibold text-lg">01</span>
                  <p className="text-center text-[13px] text-[#7d879c]">
                    Awaiting Delivery
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
