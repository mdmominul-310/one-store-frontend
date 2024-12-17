import React, { useState } from "react";
import { Modal } from "antd";
import { useAppDispatch } from "@/store/app/hooks";
import { updateConfirmationStatus } from "@/store/features/guestOrUserConfirmationSlice";
import { useNavigate } from "react-router-dom";

const GuestOrUserConfirmation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    console.log("hello")
    dispatch(updateConfirmationStatus());
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="How would you like to proceed with your order?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="As User"
        cancelText="As Guest"
        okButtonProps={{
          style: {
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#fff",
          },
        }}
      >
        <div className="py-5"></div>
      </Modal>
    </>
  );
};

export default GuestOrUserConfirmation;
