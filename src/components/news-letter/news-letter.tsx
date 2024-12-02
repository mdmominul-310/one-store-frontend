import { Button, Input, Space } from "antd";

const NewsLetter = () => {
  return (
    <div className="w-full lg:w-1/2 mx-auto p-10 border border-1 border-primary my-4">
      <h1 className="text-xl  mb-4 uppercase text-center">
        Subscribe for Newsletter
      </h1>
      <Space.Compact style={{ width: "100%" }}>
        <Input placeholder="Email" size="large" />
        <Button
          className="bg-primary text-white hover:bg-secondary"
          size="large"
        >
          Subscribe
        </Button>
      </Space.Compact>
    </div>
  );
};

export default NewsLetter;
