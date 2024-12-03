import EditPaymentMethod from "@/components/payment-method/EditPaymentMethod";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdModeEdit, MdPayment } from "react-icons/md";

const PaymentMethods = () => {
  const [isEditable, setIsEditable] = useState(false);
  const paymentMethods = [
    {
      id: 202412020005,

      cardNumber: "1234 **** **** ****",
      date: "2024-12-02",
    },
    {
      id: 202203020415,

      cardNumber: "1234 **** **** ****",
      date: "2022-03-02",
    },
    {
      id: 2023022200121,

      cardNumber: "1234 **** **** ****",
      date: "2023-02-22",
    },
    {
      id: 2022032300322,

      cardNumber: "1234 **** **** ****",
      date: "2022-03-23",
    },
  ];
  return (
    <div>
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="size-9 flex items-center justify-center rounded-full text-[#D23F57] bg-[#f5f9ff] ">
            <MdPayment />
          </span>
          Payment Methods
        </h2>
      </div>
      {isEditable ? (
        <div className="shadow px-4 py-5 rounded-sm mt-5">
          <EditPaymentMethod />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 py-5">
          {paymentMethods?.map((methods, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 items-center justify-between gap-5 shadow px-4 py-5 rounded-sm"
            >
              <div className="">#{methods?.id}</div>

              <span className="text-sm text-center">{methods?.cardNumber}</span>
              <span className="text-sm text-end">{methods?.date}</span>
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

export default PaymentMethods;
