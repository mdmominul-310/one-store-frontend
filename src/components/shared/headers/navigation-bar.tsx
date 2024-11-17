import logo from "/full_logo.png"
import { Input, } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import DropDown from "@/components/ui/DropDown";
import useCart from "@/hooks/useCart";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useGetProductsQuery } from "@/store/services/productsApiSlice";
import { IProducts } from "@/interfaces/products.interfaces";
import { useGetMenuQuery } from "@/store/services/menuApiSlice";
import { PiPhone, PiShoppingCart } from "react-icons/pi";





const NavigationBar = () => {
    const [search, setSearch] = useState('');
    const { totalItems, totalPrice } = useCart();
    const [, setSearchParams] = useSearchParams();
    const searchParams = new URLSearchParams({ search: search });
    const { data } = useGetProductsQuery(searchParams.toString());
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);
    const { data: menuData, isLoading } = useGetMenuQuery({})


    const handleNavigate = (slug: string) => {
        navigate(`/products/${slug}`)
    }

    // const DropDown: React.FC<{ label: string }> = ({ label }: { label: string }): JSX.Element => (
    //     <Dropdown menu={{ items }}>
    //         <a onClick={(e) => e.preventDefault()}>
    //             <Space>
    //                 {label}
    //                 <IoArrowDownOutline />
    //             </Space>
    //         </a>
    //     </Dropdown>
    // );
    const handleSearch = (e: SyntheticEvent) => {
        // e.preventDefault();
        const target = e.target as HTMLFormElement;
        const inputElement = target.search as HTMLInputElement;
        setSearchParams({ text: inputElement.value });
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setSearch(''); // Clear search or use another state to control visibility
        }
    };

    useEffect(() => {
        // Step 2: Setup event listeners
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="py-4">
            <div className='container grid grid-cols-12 items-center border-b-2 pb-1'>
                <div className="col-span-4 relative">
                    <form action="/search" onSubmit={handleSearch}>
                        <div className="flex ">
                            <Input placeholder="Search for products..." name="search" size="large" className=" border-0 w-[300px]  focus:border-b-[1px] focus:border-gray-300 rounded-none focus:ring-0" onChange={(e) => setSearch(e.target.value)}

                            />
                            <button type="submit" className="ml-[-30px]  z-50" ><BiSearch className="w-6 h-6 text-gray-500" /></button>
                        </div>
                        {/* products search result model  */}
                        <div className={
                            cn(
                                'absolute bg-white w-full border border-gray-200 rounded-md shadow-md h-96 overflow-y-auto',
                                { 'hidden': !search.length }
                            )
                        } ref={modalRef
                        }>
                            {
                                data?.data?.map((product: IProducts) => (
                                    <div className="flex gap-2 hover:bg-primary p-4 hover:text-white cursor-pointer"
                                        key={product._id}
                                        onClick={() => handleNavigate(product.slug)}
                                    >
                                        <div>
                                            <img src={product.images?.[0]} alt=""
                                                className="w-[50px] h-[50px] object-cover rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h1>{product.title}</h1>
                                            <p className="text-sm">TK {product.stock?.[0].salePrice} <del>TK {product.stock?.[0].regularPrice}</del></p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </form>
                    {/* <Input.Search placeholder="Search" size="large" className="w-full" /> */}
                </div>
                <div className='col-span-4 flex justify-center'>
                    <div>
                        {/* <p>Logo</p> */}
                        <Link to={"/"}>
                            <img className="w-[200px] h-[40px]" src={logo}></img>
                        </Link>

                    </div>

                </div>
                <div className="col-span-4 flex justify-end text-sm font-semibold text-slate-700 gap-3 items-center ">
                    <Link to={'/cart'}>
                        <div className='flex gap-x-4 items-center py-4 justify-end '>
                            <div className='flex items-center gap-2'>
                                <span>
                                    <PiPhone className='text-3xl ' />
                                </span>
                                {/* <div>
                                    <p className='text-sm font-semibold text-green-700'>24/7 support</p>
                                    <p className='text-sm font-semibold text-slate-700'>+880 1712454900</p>
                                </div> */}
                            </div>
                            <div>
                                <span className='flex gap-2 items-center'>
                                    <PiShoppingCart className='text-3xl ' />
                                    <div>
                                        <p className='text-sm font-semibold text-green-700'>৳{totalPrice}</p>
                                        <p className='text-sm font-semibold text-slate-700'>{totalItems} items</p>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>

            {/* Navigation Bar menu item */}
            <div className="text-sm font-semibold text-slate-700 container flex justify-center pt-4">
                <div>
                    {
                        isLoading ? <div>Loading...</div> : (
                            <div>
                                {
                                    menuData?.data?.map((item: { _id: string, name: string, children: [{ label: string, title: string, _id: string }] }) => (
                                        <>
                                            {
                                                item.children.length > 0 ? (
                                                    <DropDown key={item._id} label={item.name} items={item?.children?.map((subItem) => ({
                                                        key: subItem._id,
                                                        label: (
                                                            <Link to={`/categories/${subItem.title}`}  >{subItem.title}</Link>
                                                        )
                                                    }))} />
                                                ) : <Link to={`/categories/${item.name}`} className="px-6 hover:text-primary text-black" >{item.name}</Link>
                                            }

                                        </>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        </div>

    );
};

export default NavigationBar;