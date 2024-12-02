import NavigationBar from "./navigation-bar";
import NavBarMobile from "./navigation-bar-mobile";

const Headers = () => {
  return (
    <header className="sticky top-0 z-20 bg-white">
      {/* <div className="hidden lg:block">
                <QuickAccessBar />
            </div> */}

      <div className="hidden lg:block">
        <NavigationBar />
      </div>
      <div className="block lg:hidden">
        <NavBarMobile />
      </div>
    </header>
  );
};

export default Headers;
