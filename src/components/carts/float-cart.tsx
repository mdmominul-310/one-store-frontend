import DrawerCartContent from '@/components/carts/drawer-cart-content';
import useCart from '@/hooks/useCart';
import { Drawer } from 'antd';
import { useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
const FloatCart = () => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const { totalItems, totalPrice, cart } = useCart()
    return (
        <>
            <div className='fixed  top-72 right-0'>
                <button onClick={() => setShowDrawer(true)} className='bg-primary text-white'>
                    <span className='bg-primary'>
                        <div className='p-2'>
                            <BiShoppingBag className='text-4xl mx-auto' />
                            <p className='text-sm font-semibold  text-white'>{totalItems} items</p>
                        </div>

                        <div className='bg-secondary'>
                            <p className='text-sm font-semibold text-green-700'>৳{totalPrice}</p>

                        </div>
                    </span>
                </button>
            </div>
            <Drawer
                title="Cart Items"
                placement="right"
                closable={true}
                // width={500}
                // className='w-[700px]'
                onClose={() => setShowDrawer(false)}
                visible={showDrawer}
            >
                <DrawerCartContent carts={cart} setShowDrawer={setShowDrawer} />
            </Drawer>
        </>
    )
}

export default FloatCart;