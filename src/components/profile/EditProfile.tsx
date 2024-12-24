import useAuth from "@/hooks/useAuth";
import UseCustomToast from "@/hooks/UseCustomToast";
import { IProfile } from "@/interfaces/profile.interface";
import { updateUser } from "@/store/features/userSlice";

import { useUpdateUserMutation } from "@/store/services/authApiService";
import { useUploadImageMutation } from "@/store/services/uploadApiSlice";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { ImSpinner10 } from "react-icons/im";
import { useDispatch } from "react-redux";

type FieldType = {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
};

const EditProfile = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [uploadFile, { data: uploadData, isLoading }] =
    useUploadImageMutation();
  const [updateProfile, { data, isSuccess }] = useUpdateUserMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const profileInfo: IProfile = {
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      email: values.email as string,
      phoneNumber: values.phoneNumber as string,
      profileImage: uploadData?.data?.[0] || user.profileImage,
      dateOfBirth: values.dateOfBirth as string,
    };
    UseCustomToast(updateProfile(profileInfo), "Updating Profile");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Safely access the first file
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isUnder2MB = file.size <= 2 * 1024 * 1024; // 2 MB in bytes

      if (!isImage) {
        toast.error("Please upload a valid image file.");
        event.target.value = ""; // Clear the input
        return;
      }

      if (!isUnder2MB) {
        toast.error("File size must be 2 MB or less.");
        event.target.value = ""; // Clear the input
        return;
      }

      const formData = new FormData();
      formData.append("files", file);
      UseCustomToast(uploadFile(formData), "Uploading Image");
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      const userData = data.data;
      dispatch(updateUser(userData));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div>
      <div className="py-3">
        <div className="rounded-full border size-16 overflow-hidden">
          {isLoading ? (
            <span className="flex items-center justify-center size-full">
              <ImSpinner10 className="size-14 text-primary animate-spin" />
            </span>
          ) : (
            <label
              htmlFor="profile_input"
              className="size-16 h-16 w-16 rounded-full flex justify-center items-center text-3xl bg-slate-100 text-slate-500 cursor-pointer"
            >
              {uploadData?.data?.[0] || user.profileImage ? (
                <img src={uploadData?.data?.[0] || user.profileImage} alt="" />
              ) : (
                <FaUser />
              )}

              <input
                type="file"
                id="profile_input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }} // Optional: hide the input element
              />
            </label>
          )}
        </div>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{
          remember: true,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phone,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item<FieldType>
            label="First Name"
            name="firstName"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input first name",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="John" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Last Name"
            name="lastName"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input last name",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="Doe" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input email",
              },
            ]}
          >
            <Input
              className="w-full h-11"
              placeholder="example@gmail.com"
              type="email"
              readOnly
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Phone"
            name="phoneNumber"
            className="w-full mb-0"
            rules={[
              {
                message: "Please input phone number",
              },
            ]}
          >
            <Input
              className="w-full h-11"
              placeholder="345234242323"
              readOnly
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Birth Date"
            name="dateOfBirth"
            className="w-full mb-0"
            rules={[
              {
                type: "date",
                message: "Please select birth date",
              },
            ]}
          >
            <Input className="w-full h-11" type="date" />
          </Form.Item>
        </div>

        <button className="bg-[#E3364E] font-semibold text-white rounded duration-300 p-2 px-5 hover:bg-[#f6475e] my-5">
          Save Changes
        </button>
      </Form>
    </div>
  );
};

export default EditProfile;
