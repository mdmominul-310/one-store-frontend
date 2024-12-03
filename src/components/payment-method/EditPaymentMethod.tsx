import { IPaymentMethod } from "@/interfaces/payment-method.interface";
import type { FormProps } from "antd";
import { Form, Input } from "antd";

type FieldType = {
  cardNumber: string;
  cardName: string;
  expDate: string;
  cvc: string;
};

const EditPaymentMethod = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const addressInfo: IPaymentMethod = {
      cardNumber: values.cardNumber as string,
      cardName: values.cardName as string,
      expDate: values.expDate as string,
      cvc: values.cvc as string,
    };

    console.log({ addressInfo });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
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
            label="Card Number"
            name="cardNumber"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please input Card Number",
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
            label="Card Name"
            name="cardName"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input card Name",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="Office" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Expire Date"
            name="expDate"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                type: "date",
                message: "Please select expire date",
              },
            ]}
          >
            <Input className="w-full h-11" type="date" />
          </Form.Item>
          <Form.Item<FieldType>
            label="CVC"
            name="cvc"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input cvc",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="" />
          </Form.Item>
        </div>

        <button className="bg-[#E3364E] font-semibold text-white rounded duration-300 p-2 px-5 hover:bg-[#f6475e] mt-5">
          Save Changes
        </button>
      </Form>
    </div>
  );
};

export default EditPaymentMethod;
