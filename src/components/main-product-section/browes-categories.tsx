import { useGetCategoryQuery } from "@/store/services/categoryApiSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const BrowesCategories = () => {
  const { data, isLoading } = useGetCategoryQuery({});
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 3.5,
    autoplay: true,
    // speed: 5000,
    autoplaySpeed: 5000,
    // cssEase: "linear"
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    // prevArrow: <PrevArrow onClick={() => sliderRef?.current?.slickPrev()} />,
    // nextArrow: <NextArrow onClick={() => sliderRef?.current?.slickNext()} />,
  };
  // Ref to access the slider methods
  const sliderRef = useRef<Slider | null>(null);
  if (isLoading) {
    return (
      <div className="slider-container">
        <div className="w-[100vw] h-[300px] bg-gray-200 animate-pulse"></div>
      </div>
    );
  }
  return (
    <div className="my-4 ">
      <div className="border-b-2  flex flex-col items-center">
        <h2 className="text-xl font-medium text-center uppercase ">
          Browse Our Categories
        </h2>
        <hr className="mt-3 border-primary border-[1px] w-[300px]" />
      </div>
      <div className="">
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {data?.data?.map(
              (
                item: { id: string; name: string; image?: string },
                index: number
              ) => (
                <div
                  key={index}
                  className=" p-3 relative cursor-pointer"
                  onClick={() => navigate(`/categories/${item.name}`)}
                >
                  <img
                    src={
                      item?.image
                        ? item.image
                        : "https://cdn.bitcommerz.com/manfare-bd/media/1710417915870-manfare_bd-id-13.jpeg"
                    }
                    alt=""
                    className="rounded-lg"
                  />
                  <button className="bg-white text-primary hover:bg-primary hover:text-white font-semibold p-1 rounded text-sm block absolute bottom-8 lg:left-[45%] left-[30%] px-4">
                    {item.name}
                  </button>
                </div>
              )
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BrowesCategories;
