import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const DashboardLeftSide = () => {
  const { pathname } = useLocation();
  const menus = [
    {
      title: "Dashboard",
      items: [
        {
          label: "orders",
          href: "/dashboard/orders",
          icon: <LiaShoppingBagSolid />,
        },
        {
          label: "wishlist",
          href: "/dashboard/wishlist",
          icon: <FaRegHeart />,
        },
      ],
    },
    {
      title: "Account Settings",
      items: [
        {
          label: "profile info",
          href: "/dashboard/profile",
          icon: <FaRegUser />,
        },
        {
          label: "addresses",
          href: "/dashboard/address",
          icon: <IoLocationOutline />,
        },
        {
          label: "payment methods",
          href: "/dashboard/payment-methods",
          icon: <MdPayment />,
        },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-7 py-5 shadow rounded-md">
      {menus.map((menu, index) => (
        <div key={index}>
          <h3 className="text-xs text-[#7d879c] uppercase px-5 border-l-4 border-transparent">
            {menu?.title}
          </h3>
          <div className="grid grid-cols-1 gap-3 pt-3">
            {menu?.items.map((item, index) => (
              <Link
                to={item?.href}
                key={index}
                className={`${
                  pathname.includes(item?.href) &&
                  "text-[#D23F57] border-[#D23F57]"
                } px-5 text-sm text-[#444a56] capitalize border-l-4 border-transparent hover:border-[#D23F57] hover:text-[#D23F57] flex items-center gap-2 transition-all duration-300`}
              >
                {item?.icon} <p>{item?.label}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardLeftSide;
