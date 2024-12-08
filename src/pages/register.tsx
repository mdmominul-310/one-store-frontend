import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, FormProps, Input } from "antd";
import { Link } from "react-router-dom";
import "./../App.css";
import { useCreateUserMutation } from "@/store/services/authApiService";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";

type FieldType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string;
};

const Register = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    values.phone = "+880" + values.phone;

    const result = await createUser(values);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  return (
    <div className="container py-10 flex justify-center items-center">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ minWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          name="firstName"
          rules={[{ required: true, message: "Please input your FirstName!" }]}
        >
          <Input placeholder="First Name" type="firstName" className="h-11" />
        </Form.Item>
        <Form.Item<FieldType>
          name="lastName"
          rules={[{ required: true, message: "Please input your LastName!" }]}
        >
          <Input placeholder="Last Name" type="lastName" className="h-11" />
        </Form.Item>
        <Form.Item<FieldType>
          name="phone"
          rules={[
            { required: true, message: "Please input your number" },
            {
              pattern: /^[0-9]*$/,
              message: "values can't be negative",
            },
          ]}
        >
          <Input
            prefix={"+880"}
            placeholder="01723344556"
            type="number"
            className="h-11"
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e" || e.key === "E") {
                e.preventDefault(); // Prevent "-" and exponential notation keys
              }
            }}
            min={1111111111}
            max={9999999999}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="example@gmail.com"
            type="email"
            className="h-11"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="input password"
            className="h-11"
          />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#E3364E] font-semibold text-white rounded duration-300 px-5 h-11 py-2 hover:bg-[#f6475e] flex items-center justify-center w-full"
          >
            {isLoading ? (
              <ImSpinner2 className="text-xl animate-spin" />
            ) : (
              "Register"
            )}
          </button>
          <div className="my-5 text-center">
            Already a Member?{" "}
            <Link to={"/login"} className="text-[#E3364E]">
              Login
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
