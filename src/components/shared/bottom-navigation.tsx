import { HomeIcon } from "@radix-ui/react-icons";
import { BiSearch } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router-dom";


interface INavItem {
    label: string;
    icon: JSX.Element;
    link: string;
}

const BottomNavigation = () => {
    const navItems: INavItem[] = [
        {
            label: 'Home',
            icon: <HomeIcon className="w-6 h-6" />,
            link: '/'
        },
        {
            label: 'Categories',
            icon: <TbCategoryFilled className="w-6 h-6" />,
            link: '/all-products'
        },
        {
            label: 'Search',
            icon: <BiSearch className="w-6 h-6" />,
            link: '/search'
        },
        {
            label: 'Cart',
            icon: <CgShoppingCart className="w-6 h-6" />,
            link: '/cart'
        },

    ]
    return (
        <div className="sticky bottom-0 bg-primary text-white block lg:hidden">
            <div className="container">
                <div className="flex justify-between items-center py-2">

                    {
                        navItems.map((item, index) => (
                            <Link to={item.link} key={index} className="flex flex-col items-center">
                                {item.icon}
                                <p className="text-xs">{item.label}</p>
                            </Link>
                        ))
                    }



                </div>
            </div>

        </div>
    )
}



export default BottomNavigation;