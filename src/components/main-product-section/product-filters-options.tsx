import { Radio, RadioChangeEvent, Space } from "antd";

interface IPriceFilterOptions {
  label: string;
  value: string;
}
interface ICategory {
  _id: string;
  name: string;
}

interface IProductFilterOptions {
  onChange: (e: RadioChangeEvent) => void;
  price: string;
  onChangeCT: (e: RadioChangeEvent) => void;
  category: string;
  categories: { data: ICategory[] } | undefined;
}

const ProductFilterOptions = ({
  onChange,
  price,
  onChangeCT,
  category,
  categories,
}: IProductFilterOptions) => {
  const priceFilterOptions: IPriceFilterOptions[] = [
    {
      label: " ৳0-৳1000",
      value: "0-1000",
    },
    {
      label: "৳1000-৳5000",
      value: "1000-5000",
    },
    {
      label: "৳5000-৳10000",
      value: "5000-10000",
    },
    {
      label: "৳10000-৳20000",
      value: "10000-20000",
    },
    {
      label: "৳20000-৳50000",
      value: "20000-50000",
    },
    {
      label: "৳50000-৳100000",
      value: "50000-100000",
    },
  ];
  return (
    <div className=" w-full ">
      <div className=" my-4">
        <h2 className="text-2xl font-semibold border-b-2  ">FILTER BY</h2>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold border-b-2  my-4 ">PRICE</h2>

        <Radio.Group onChange={onChange} value={price}>
          <Space direction="vertical">
            {priceFilterOptions.map((price: IPriceFilterOptions) => (
              <Radio key={price.value} value={price.value}>
                {price.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div className="my-4">
        <h2 className="text-xl font-semibold border-b-2  my-4 ">CATEGORY</h2>
        <Radio.Group onChange={onChangeCT} value={category}>
          <Space direction="vertical">
            {categories?.data?.map((category: ICategory) => (
              <Radio key={category._id} value={category.name}>
                {category.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default ProductFilterOptions;
