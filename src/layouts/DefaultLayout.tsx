import FloatCart from '@/components/carts/float-cart';
import BottomNavigation from '@/components/shared/bottom-navigation';
import Footer from '@/components/shared/footer/Footer';
import Headers from '@/components/shared/headers/headers';
import { Outlet } from 'react-router-dom';

const DefaultLayout = (): JSX.Element => {
    return (
        <div className='relative h-screen'>
            <Headers />
            <Outlet />
            <Footer />
            <FloatCart />
            <BottomNavigation />
        </div>
    );
}

export default DefaultLayout;
