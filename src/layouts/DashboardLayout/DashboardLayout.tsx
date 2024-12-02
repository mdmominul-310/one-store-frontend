import Footer from "@/components/shared/footer/Footer";
import Headers from "@/components/shared/headers/headers";
import { Outlet } from "react-router-dom";
import DashboardLeftSide from "./DashboardLeftSide";

const DashboardLayout = (): JSX.Element => {
  return (
    <div className="relative h-screen ">
      <Headers />
      <div className="container flex  gap-10 py-5">
        <div className="hidden lg:block w-80">
          <DashboardLeftSide />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
