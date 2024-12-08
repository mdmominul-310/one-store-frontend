import { IAddress } from "@/interfaces/address.interface";
import type { FormProps } from "antd";
import { Form, Input } from "antd";

type FieldType = {
  name: string;
  addressLine: string;
  phoneNumber: string;
};

const EditAddress = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const addressInfo: IAddress = {
      name: values.name as string,
      addressLine: values.addressLine as string,
      phoneNumber: values.phoneNumber as string,
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
            label="Name"
            name="name"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input name",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="Office" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Address Line"
            name="addressLine"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input address line",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="Erdman Passage" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone"
            name="phoneNumber"
            className="w-full mb-0"
            rules={[
              {
                required: true,
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
        </div>

        <button className="bg-[#E3364E] font-semibold text-white rounded duration-300 p-2 px-5 hover:bg-[#f6475e] mt-5">
          Save Changes
        </button>
      </Form>
    </div>
  );
};

export default EditAddress;
