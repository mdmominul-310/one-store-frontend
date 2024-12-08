import { useLoginUserMutation } from "@/store/services/authApiService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, FormProps, Input } from "antd";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const result = await loginUser(values);
    if (result?.data?.success) {
      localStorage.setItem("access_token", result?.data?.data?.token);
      toast.success(result?.data?.message);
      navigate("/");
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
        <div className=" text-right mb-3">
          <Link to={"/forgot-password"} className="text-[#E3364E]">
            Forgot Password
          </Link>
        </div>

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
            Not a Member?{" "}
            <Link to={"/register"} className="text-[#E3364E]">
              Register
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
