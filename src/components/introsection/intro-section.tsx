import { CiStar } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

const IntroSection = () => {
  const data: {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
  }[] = [
    {
      id: 1,
      title: "High Quality Products",
      description: "Enjoy high quality products at affordable price",
      icon: <CiStar />,
    },
    {
      id: 2,
      title: "Fast Delivery",
      description: "Get your product delivered at your doorstep",
      icon: <FaTruckFast />,
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Get support from us 24/7",
      icon: <MdOutlineSupportAgent />,
    },
    {
      id: 4,
      title: "Secure Payment",
      description: "We provide secure payment method",
      icon: <RiSecurePaymentLine />,
    },
  ];
  return (
    <section className="flex my-8">
      <div className="">
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
          {data.map((item, index) => (
            <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
              <div className="text-center flex gap-2">
                <div className="text-3xl text-primary border-2 hover:bg-primary hover:text-white duration-500 w-1/5 p-4 h-full rounded-full  border-primary border-double border-d  items-center flex justify-center">
                  <span>{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
