import { useGetBannerQuery } from "@/store/services/bannerApiSlice";
import Slider from "react-slick";

function HeroCarusel() {
    const { data, isLoading } = useGetBannerQuery({});

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
    };

    if (isLoading) {
        return (
            <div className="slider-container">
                <div className="w-[100vw] h-[300px] bg-slate-600 animate-pulse"></div>
            </div>
        );
    }
    return (
        <div className="slider-container">
            <Slider {...settings}
            >

                {
                    data?.data?.meadia.map((item: string, index: number) => (
                        <div key={index} className="w-[100vw] ">
                            <img src={item} alt="banner" className="w-full h-full " />
                        </div>
                    ))
                }

            </Slider>

        </div>
    );
}

export default HeroCarusel;
