import useAuth from "@/hooks/useAuth";
import UseCustomToast from "@/hooks/UseCustomToast";
import { UserUpdateSuccessResponse } from "@/interfaces/api-response.interface";
import { IProfile } from "@/interfaces/profile.interface";
import { updateUser } from "@/store/features/userSlice";

import { useUpdateUserMutation } from "@/store/services/authApiService";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import { FaUser } from "react-icons/fa";
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
  const [updateProfile] = useUpdateUserMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const profileInfo: IProfile = {
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      email: values.email as string,
      phoneNumber: values.phoneNumber as string,
      dateOfBirth: values.dateOfBirth as string,
    };
    UseCustomToast(updateProfile(profileInfo), "Updating Profile").then(
      (result: UserUpdateSuccessResponse) => {
        if (result.data) {
          const {
            _id,
            firstName,
            lastName,
            phone,
            phoneNumberVerified,
            email,
            emailVerified,
            profileImage,
            role,
            status,
            id,
          } = result?.data?.data || {};
          const userData = {
            _id,
            firstName,
            lastName,
            phone,
            phoneNumberVerified,
            email,
            emailVerified,
            profileImage,
            role,
            status,
            id,
          };
          dispatch(updateUser(userData));
        }
      }
    );
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  
  return (
    <div>
      <div className="py-3">
        <div className="size-16 border rounded-full flex justify-center items-center text-3xl bg-slate-100 text-slate-500">
          <FaUser />
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
