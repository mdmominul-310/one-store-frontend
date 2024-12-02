import Slider from "react-slick";
import ProductCard from "../products/product-card";
import { useGetProductsQuery } from "@/store/services/productsApiSlice";
import { IProducts } from "@/interfaces/products.interfaces";
import BrowesCategories from "./browes-categories";
import { Link } from "react-router-dom";
import HomeSkeletons from "../ui/skeletons/home-skeletons";

const MainProductSection = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 5,
    autoplay: true,
    // speed: 5000,
    autoplaySpeed: 2000,
    // cssEase: "linear"
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };
  if (isLoading) {
    return <HomeSkeletons />;
  }
  // prints the current viewport width
  return (
    <div className="my-8">
      {/* browse categories  */}
      <BrowesCategories />
      <div>
        <div className="border-b-2  flex mb-8 flex-col items-center relative">
          <h2 className="md:text-2xl text-xl  font-medium pb-2 text-center uppercase ">
            Flash Sale
          </h2>
          <hr className="border-red-700 border-[1px] md:w-[100px] w-[200px] absolute bottom-[-2px]" />
        </div>

        <div className=" ">
          <div className="slider-container">
            <Slider {...settings}>
              {data?.data?.map((item: IProducts, index: number) => (
                <div className="p-3 " key={index}>
                  <ProductCard products={item}></ProductCard>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="my-5 ">
        <div className="border-b-2  flex mb-8 flex-col items-center relative">
          <h2 className="md:text-2xl text-xl  font-medium pb-2 text-center uppercase ">
            Top Products
          </h2>
          <hr className="border-red-700 border-[1px] md:w-[140px] w-[200px] absolute bottom-[-2px]" />
        </div>

        <div className="flex flex-col items-center">
          <div className=" grid lg:grid-cols-4 grid-cols-2 gap-8 ">
            {data?.data?.map((item: IProducts, index: number) => (
              <ProductCard key={index} products={item}></ProductCard>
            ))}
          </div>
          <Link
            to="/all-products"
            className="flex justify-center w-[300px] items-center mt-10 bg-gray-200 p-2  hover:bg-primary hover:text-white rounded-lg"
          >
            <p className="text-lg font-semibold">View All Products</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainProductSection;
