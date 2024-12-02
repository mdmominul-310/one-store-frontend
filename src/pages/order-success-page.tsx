import { Result } from "antd";
import ReactPixel from "react-facebook-pixel";

const OrderSuccessPage = () => {
  ReactPixel.track("Purchase", {
    value: 100,
    currency: "USD",
  });

  return (
    <Result
      status="success"
      title="Successfully Purchased !"
      subTitle="Your Order placed successfully"
      className="min-h-screen  mt-56"
    />
  );
};

export default OrderSuccessPage;
