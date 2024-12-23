import UseCustomToast from "@/hooks/UseCustomToast";
import { addUser } from "@/store/features/userSlice";
import { useLoginUserMutation } from "@/store/services/authApiService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, FormProps, Input } from "antd";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect");
  const [loginUser, { isLoading, isSuccess, data }] = useLoginUserMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    UseCustomToast(loginUser(values), "Logging in");
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.data) {
        dispatch(addUser(data.data));
      }
      if (redirectUrl) {
        navigate(`/${redirectUrl}`);
      } else {
        navigate("/");
      }
    }
  }, [data?.data, dispatch, isSuccess, navigate, redirectUrl]);

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
              "Login"
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
