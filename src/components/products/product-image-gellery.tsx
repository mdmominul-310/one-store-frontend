
// import React from "react";
// import Slider from "react-slick";

import React from "react";
import ReactImageMagnify from "react-image-magnify";


// function ProductImageGellery({ images }: { images: string[] }) {
//     const settings = {
//         customPaging: function (idx: number) {
//             return (
//                 <a className="w-[200px]">
//                     <img src={images[idx]} className="w-[150px]" />
//                 </a>
//             );
//         },
//         dots: true,
//         dotsClass: "slick-dots slick-thumb",
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     }
//     if (images.length === 1) {
//         return (
//             <React.Fragment>
//                 <div className="slider-container">
//                     <img src={images[0]} />
//                 </div>
//             </React.Fragment>

//         )
//     }
//     return (
//         <React.Fragment>
//             <div className="slider-container">
//                 <Slider {...settings}>

//                     {
//                         images?.map((image, index) => (
//                             <div key={index}>
//                                 <img src={image} />
//                             </div>
//                         ))
//                     }

//                 </Slider>
//             </div>
//         </React.Fragment>

//     )
// }
const ProductImageGellery = ({ images }: { images: string[] }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <div>
            <div className="w-full">
                {/* <img src={images[activeIndex]} /> */}
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: images[activeIndex],
                        // srcSet: this.srcSet,
                        sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                    },
                    largeImage: {
                        src: images[activeIndex],
                        width: 2000,
                        height: 1800
                    },
                    enlargedImageContainerDimensions: {
                        width: '220%',
                        height: '100%'
                    }
                }} />
            </div>
            <div className="flex gap-4 my-5">
                {
                    images.map((img, index) => (
                        <div key={index} onClick={() => setActiveIndex(index)}>
                            <img src={img} alt="" className="w-[50px] h-[50px] object-cover rounded-md" />
                        </div>
                    ))
                }
            </div>

        </div>
    );

}

export default ProductImageGellery;