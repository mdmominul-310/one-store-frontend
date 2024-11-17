import NewsLetter from '@/components/news-letter/news-letter';
import HomeSkeletons from '@/components/ui/skeletons/home-skeletons';
import { lazy, Suspense, useEffect } from 'react';
const HeroSection = lazy(() => import('@/components/hero-section/hero-section'));
const IntroSection = lazy(() => import('@/components/introsection/intro-section'));
const MainProductSection = lazy(() => import('@/components/main-product-section/main-product-section'));
const PromotionMeadia = lazy(() => import('@/components/promotion/promotion-meadia'));
import ReactPixel from 'react-facebook-pixel'



const Home = () => {
    ReactPixel.pageView(); // For tracking page view

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Suspense
            fallback={<HomeSkeletons />}
        >
            <HeroSection />
            <div className='container '>

                {/* <PromotionBanner /> */}
                <MainProductSection />
                <PromotionMeadia />
                <IntroSection />
                <NewsLetter />
            </div>
        </Suspense>
    );
};

export default Home;