
import { CiShop } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";


const CategorisMeghaMenu = () => {
    return (
        <>
            <ul className="w-[300px] ">
                {
                    Array(10).fill(0).map((_, i) => (
                        <li className=" group relative inline-block z-10 w-full border border-green-100 border-t-0 shadow" key={i}>
                            <div className="flex justify-between items-center border border-b-2 hover:bg-slate-400">
                                <span className="flex items-center p-2"><CiShop /> All Products </span> <IoIosArrowForward />
                            </div>
                            <div className="  top-2 z-20 bg-white absolute hidden w-[600px] left-[300px]  transition duration-500 group-hover:block  ">
                                <div className="grid grid-cols-3 gap-4 p-4" >
                                    <div>
                                        <img src="https://woodmart.xtemos.com/wp-content/uploads/2017/01/menu-product-1-118x118.jpg" className="" alt="" />
                                        <h1 className="font-semibold text-slate-600 text-sm  ">Items Title</h1>

                                        <ul className="">
                                            {
                                                Array(10).fill(0).map((_, i) => (
                                                    <li key={i} className="text-xs hover:text-slate-600 cursor-pointer py-1">This ite item</li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                    <div>
                                        <img src="https://woodmart.xtemos.com/wp-content/uploads/2017/01/menu-product-1-118x118.jpg" alt="" />
                                        <h1 className="font-semibold text-slate-600 text-sm ">Items Title</h1>

                                        <ul className="">
                                            {
                                                Array(10).fill(0).map((_, i) => (
                                                    <li key={i} className="text-xs hover:text-slate-600 cursor-pointer py-1">This ite item</li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                    <div>
                                        <img src="https://woodmart.xtemos.com/wp-content/uploads/2017/01/menu-product-1-118x118.jpg" alt="" />
                                        <h1 className="font-semibold text-slate-600 text-sm ">Items Title</h1>

                                        <ul className="">
                                            {
                                                Array(10).fill(0).map((_, i) => (
                                                    <li key={i} className="text-xs hover:text-slate-600 cursor-pointer py-1">This ite item</li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </li>
                    ))
                }


            </ul >


        </>

    );
};

export default CategorisMeghaMenu;