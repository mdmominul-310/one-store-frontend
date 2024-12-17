import useAuth from "@/hooks/useAuth";
import UseCustomToast from "@/hooks/UseCustomToast";
import { IAddress } from "@/interfaces/address.interface";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/store/services/addressApiService";
import type { FormProps } from "antd";
import { Form, Input, Select } from "antd";

type AddressType = "Home" | "Work" | "Office" | "Other";

type FieldType = {
  country: "bangladesh";
  fullName: string;
  phoneNumber: string;
  landmark: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  policeStation: string;
  addressType: AddressType;
  isDefault: boolean;
};

const EditAddress: React.FC<{ address: IAddress | null }> = ({ address }) => {
  const { user } = useAuth();
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    values.phoneNumber = "+880" + values.phoneNumber;
    const addressInfo: IAddress = {
      country: "bangladesh",
      city: values.city as string,
      fullName: values.fullName as string,
      policeStation: values.policeStation as string,
      state: values.state as string,
      landmark: values.landmark as string,
      addressLine1: values.addressLine1 as string,
      addressLine2: values.addressLine2 as string,
      zipCode: values.zipCode as string,
      phoneNumber: values.phoneNumber as string,
      addressType: values.addressType as AddressType,
      isDefault: values.isDefault,
      user: user._id,
    };
    let updateFunc;
    let loadingName;
    if (address?.city) {
      updateFunc = updateAddress;
      addressInfo._id = address._id;
      loadingName = "Updating Address";
    } else {
      updateFunc = addAddress;
      loadingName = "Adding Address";
    }

    UseCustomToast(updateFunc(addressInfo), loadingName);
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
        initialValues={{
          remember: true,
          country: "bangladesh",
          city: address?.city,
          fullName: address?.fullName,
          policeStation: address?.policeStation,
          state: address?.state,
          landmark: address?.landmark,
          addressLine1: address?.addressLine1,
          addressLine2: address?.addressLine2,
          zipCode: address?.zipCode,
          phoneNumber: address?.phoneNumber?.slice(4),
          addressType: address?.addressType || "Home",
          isDefault: address?.isDefault || true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item<FieldType>
            label="Full Name"
            name="fullName"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input full Name",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="full Name" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Phone Number"
            className="w-full mb-0"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your number" },
              {
                pattern: /^[0-9]*$/,
                message: "values can't be negative",
                len: 10,
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
            label="Country"
            name="country"
            className="w-full mb-0"
          >
            <Input className="w-full h-11" readOnly />
          </Form.Item>
          <Form.Item<FieldType>
            label="City"
            name="city"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input city",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="City Name" />
          </Form.Item>
          <Form.Item<FieldType>
            label="State"
            name="state"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input state",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="State Name" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Zip Code"
            name="zipCode"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input zipCode",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="Zip Code" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Police Station"
            name="policeStation"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input Police Station",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="Police Station" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Land Mark"
            name="landmark"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input land mark",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="land mark" />
          </Form.Item>
          <Form.Item<FieldType>
            label="AddressLine 1"
            name="addressLine1"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input addressLine 1",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="addressLine 1" />
          </Form.Item>
          <Form.Item<FieldType>
            label="AddressLine 2"
            name="addressLine2"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please input addressLine 2",
              },
            ]}
          >
            <Input className="w-full h-11" placeholder="addressLine 2" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Address Type"
            name="addressType"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please select address type",
              },
            ]}
          >
            <Select className="w-full h-11">
              <Select.Option value="Home">Home</Select.Option>
              <Select.Option value="Work">Work</Select.Option>
              <Select.Option value="Office">Office</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Is Default?"
            name="isDefault"
            className="w-full mb-0"
            rules={[
              {
                required: true,
                message: "Please select isDefault",
              },
            ]}
          >
            <Select className="w-full h-11">
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
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
