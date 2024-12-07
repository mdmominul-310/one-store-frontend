import NewsLetter from "@/components/news-letter/news-letter";
import HomeSkeletons from "@/components/ui/skeletons/home-skeletons";
import { jwtDecode } from "jwt-decode";
import { lazy, Suspense, useEffect } from "react";
const HeroSection = lazy(
  () => import("@/components/hero-section/hero-section")
);
const IntroSection = lazy(
  () => import("@/components/introsection/intro-section")
);
const MainProductSection = lazy(
  () => import("@/components/main-product-section/main-product-section")
);
const PromotionMeadia = lazy(
  () => import("@/components/promotion/promotion-meadia")
);
import ReactPixel from "react-facebook-pixel";

const Home = () => {
  ReactPixel.pageView(); // For tracking page view
  const token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(token as string);
  const currentTime = Math.floor(Date.now() / 1000);
  console.log({ decodedToken: decodedToken?.exp, currentTime });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<HomeSkeletons />}>
      <HeroSection />
      <div className="container ">
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
