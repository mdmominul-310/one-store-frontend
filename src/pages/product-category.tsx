import ProductCard from "@/components/products/product-card";
import { IProducts } from "@/interfaces/products.interfaces";
import { useGetProductsQuery } from "@/store/services/productsApiSlice";
import React, { useEffect, useState } from 'react';
import { Drawer, type RadioChangeEvent } from 'antd';
import { useGetCategoryQuery } from "@/store/services/categoryApiSlice";
import { useSearchParams } from "react-router-dom";
import ReactPixel from 'react-facebook-pixel';
import ProductSkeletons from "@/components/ui/skeletons/product-skeletons";
import ProductFilterOptions from "@/components/main-product-section/product-filters-options";
import { FiFilter } from "react-icons/fi";



const ProductCategory: React.FC = (): JSX.Element => {
    // const [value, setValue] = useState(1);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, isError } = useGetProductsQuery(searchParams.toString());
    const { data: categories } = useGetCategoryQuery({})

    // console.log(searchParams.toString())
    const onChange = (e: RadioChangeEvent) => {
        setPrice(e.target.value);
    };
    const onChangeCT = (e: RadioChangeEvent) => {
        setCategory(e.target.value)

    };




    React.useEffect(() => {
        const search = searchParams.get('search') || '';
        if (price) {
            setSearchParams({ price, search })
        }
        if (category) {
            const str = category;
            const categoryString = str.charAt(0) + str.slice(1).toLowerCase();
            setSearchParams({ category: categoryString, search })
        }
        if (price && category) {
            setSearchParams({ price, category, search })
        }
    }, [price, category, setSearchParams, searchParams])

    ReactPixel.pageView(); // For tracking page view

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])






    if (isLoading) return <ProductSkeletons />
    if (isError) return <div>Error...</div>
    return (

        <div>
            <div className=" lg:hidden container flex justify-between border-b-2 border-primary items-center"
                onClick={() => setOpenDrawer(true)}
            >
                <div>
                    <h2 className='text-2xl font-semibold '>FILTER</h2>
                </div>
                <div>
                    <FiFilter className='text-2xl' />
                </div>
            </div>
            <div className="my-4 container flex ">
                <div className="hidden lg:block mr-8 w-1/5">
                    <ProductFilterOptions onChange={onChange} price={price} onChangeCT={onChangeCT} category={category} categories={categories} />

                </div>
                <div className=' w-full grid lg:grid-cols-3 grid-cols-2 gap-4 '>
                    {
                        data?.data?.map((product: IProducts) => (
                            <ProductCard key={product._id} products={product} />
                        ))
                    }
                </div>
            </div>
            <Drawer title="Items" onClose={() => setOpenDrawer(false)} open={openDrawer} placement="top" height={'70%'} width={200}>
                <div>
                    <ProductFilterOptions onChange={onChange} price={price} onChangeCT={onChangeCT} category={category} categories={categories} />
                </div>
            </Drawer>
        </div>
    )
}


export default ProductCategory;