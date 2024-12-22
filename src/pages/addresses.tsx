import EditAddress from "@/components/address/EditAddress";
import UseCustomToast from "@/hooks/UseCustomToast";
import { IAddress } from "@/interfaces/address.interface";
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
} from "@/store/services/addressApiService";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

const Address = () => {
  const [isEditable, setIsEditable] = useState(false);

  const [editableAddress, setEditableAddress] = useState<IAddress | null>(null);
  const { data } = useGetAddressesQuery({});
  const [deleteAddress] = useDeleteAddressMutation();
  const addresses: IAddress[] = data?.data;

  const handleDeleteAddress = (id: string) => {
    UseCustomToast(deleteAddress(id), "Deleting Address");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="size-9 flex items-center justify-center rounded-full text-[#D23F57] bg-[#f5f9ff] ">
            <IoLocationOutline />
          </span>
          Addresses
        </h2>
        <button
          onClick={() => setIsEditable(!isEditable)}
          className="px-5 py-1 bg-[#ffe9ec] text-[#D23F57] text-sm rounded-md"
        >
          {isEditable ? "Show" : "Add"} Address
        </button>
      </div>
      {isEditable ? (
        <div className="shadow px-4 py-5 rounded-sm mt-5">
          <EditAddress
            address={editableAddress}
            setIsEditable={setIsEditable}
          />
        </div>
      ) : (
        <>
          {addresses?.length ? (
            <div className="grid grid-cols-1 gap-5 py-5">
              {addresses?.map((address, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-5 items-center justify-between gap-5 shadow px-4 py-5 rounded-sm ${
                    address.isDefault ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="">{address?.addressType}</div>
                  <div className="">{address?.city}</div>

                  <span className="text-sm text-center">
                    {address?.zipCode}
                  </span>
                  <span className="text-sm text-end">{address?.landmark}</span>
                  <span className="text-[#7d879c] text-end  flex items-center justify-end gap-3">
                    <MdModeEdit
                      onClick={() => {
                        setIsEditable(!isEditable);
                        setEditableAddress(address);
                      }}
                      className="cursor-pointer hover:text-blue-500"
                    />
                    <IoMdTrash
                      onClick={() =>
                        handleDeleteAddress(address?._id as string)
                      }
                      className="cursor-pointer hover:text-red-500"
                    />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-5">Address is empty</div>
          )}
        </>
      )}
    </div>
  );
};

export default Address;
