import { IProfile } from "@/interfaces/profile.interface";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import { FaUser } from "react-icons/fa";

type FieldType = {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
};

const EditProfile = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const profileInfo: IProfile = {
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      email: values.email as string,
      phoneNumber: values.phoneNumber as string,
      dateOfBirth: values.dateOfBirth as string,
      profileImage: "",
    };

    console.log({ profileInfo });
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
            <FaUser/>
        </div>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
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
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Phone"
            name="phoneNumber"
            className="w-full mb-0"
            rules={[
              {
                type: "number",
                message: "Please input phone number",
              },
            ]}
          >
            <Input
              className="w-full h-11"
              placeholder="345234242323"
              type="number"
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
