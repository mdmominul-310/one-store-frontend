import Slider from "react-slick"


const TopProductsCarusel = () => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,


    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {
                    Array(5).fill(0).map((_, i) => (
                        <div className='border border-green-700 h-full' key={i}>
                            <h2 className='font-bold p-4 text-xl'>Top Products</h2>

                            <img
                                src="https://woodmart.b-cdn.net/wp-content/uploads/2018/11/retail-black-friday-product-39-opt-276x252.jpg"
                                alt=""
                                className='w-full object-cover hover:scale-110 transition duration-300 ease-in-out overflow-hidden'
                            />
                            <div className='flex justify-center items-center'>
                                <div>
                                    <h3>This is product title</h3>
                                    <p className='text-green-700'>Price: $500</p>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </Slider >

        </div>
    )
}

export default TopProductsCarusel