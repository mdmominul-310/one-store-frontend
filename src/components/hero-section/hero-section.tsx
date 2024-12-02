import HeroCarusel from "./hero-carusel";

const HeroSection = () => {
  return (
    // <div>
    //     <div className='grid grid-cols-12 '>
    //         {/* category megha menu section  */}
    //         <div className='col-span-3 pt-4 mr-3 w-[300px]'>
    //             <h1 className='text-xl font-bold bg-primary p-1 text-white font-sans flex items-center gap-x-2'> <GiHamburgerMenu />Categories</h1>
    //             <CategoriesMeghaMenu />

    //         </div>
    //         <div className=' col-span-9'>
    //             {/* search bar  */}
    //             <div className='grid grid-cols-12 gap-x-3'>
    //                 <div className='py-4 col-span-8 flex '>
    //                     <Input placeholder='Search for products' className='w-full rounded-none' />
    //                     <Button className='rounded-none text-white hover:bg-secondary'>Search</Button>
    //                 </div>
    //                 <div className='col-span-4'>
    //                     <Link to={'/cart'}>

    //                         <div className='flex gap-x-4 items-center py-4 justify-end '>
    //                             <div className='flex items-center gap-2'>
    //                                 <span>
    //                                     <IoCall className='text-xl' />
    //                                 </span>
    //                                 <div>
    //                                     <p className='text-sm font-semibold text-green-700'>24/7 support</p>
    //                                     <p className='text-sm font-semibold text-slate-700'>123-456-7890</p>
    //                                 </div>
    //                             </div>
    //                             <div>
    //                                 <span className='flex gap-2'>
    //                                     <BiShoppingBag className='text-4xl' />
    //                                     <div>
    //                                         <p className='text-sm font-semibold text-green-700'>$33.00</p>
    //                                         <p className='text-sm font-semibold text-slate-700'>1 items</p>
    //                                     </div>
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     </Link>

    //                 </div>

    //             </div>
    //             {/* carusel section */}
    //             <div className='grid grid-cols-12'>
    //                 <div className='col-span-8'>
    //                     <HeroCarusel />
    //                 </div>

    //                 <div className='col-span-4 ml-4'>
    //                     <TopProductsCarusel />
    //                 </div>
    //             </div>

    //         </div>

    //     </div>

    // </div>
    <HeroCarusel />
  );
};

export default HeroSection;
