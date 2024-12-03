import EditAddress from "@/components/address/EditAddress";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

const Address = () => {
  const [isEditable, setIsEditable] = useState(false);
  const addresses = [
    {
      title: "Office",
      location: "497 Erdman Passage, New Zoietown",
      details: "(213 840-9416)",
    },
    {
      title: "Shop",
      location: "8000 Evans Brooks, Lake Jo",
      details: "345 510-1406",
    },
    {
      title: "Garage",
      location: "978 Elton Springs, Eribertoview",
      details: "(932) 581-1393",
    },
    {
      title: "Coffee House",
      location: "3899 Gutkowski Views, North Claudiamouth",
      details: "201.292.9655 x140",
    },
    {
      title: "Italian Restaurant",
      location: "789 Spencer Lock, Lolitaberg",
      details: "445-946-3391",
    },
  ];

  return (
    <div>
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="size-9 flex items-center justify-center rounded-full text-[#D23F57] bg-[#f5f9ff] ">
            <IoLocationOutline />
          </span>
          Addresses
        </h2>
      </div>
      {isEditable ? (
        <div className="shadow px-4 py-5 rounded-sm mt-5">
          <EditAddress />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 py-5">
          {addresses?.map((address, idx) => (
            <div
              key={idx}
              className="grid grid-cols-5 items-center justify-between gap-5 shadow px-4 py-5 rounded-sm"
            >
              <div className="">{address?.title}</div>

              <span className="text-sm text-center col-span-2">
                {address?.location}
              </span>
              <span className="text-sm text-end">{address?.details}</span>
              <span className="text-[#7d879c] text-end  flex items-center justify-end gap-3">
                <MdModeEdit
                  onClick={() => setIsEditable(!isEditable)}
                  className="cursor-pointer hover:text-blue-500"
                />
                <IoMdTrash className="cursor-pointer hover:text-red-500" />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;
