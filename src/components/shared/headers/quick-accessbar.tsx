import { HeartIcon } from "@radix-ui/react-icons";
import { MdEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";

const QuickAccessBar = () => {
    return (
        <div className="bg-primary text-white py-2">
            <div className="container flex justify-between">
                <div className="flex gap-4">
                    <span className="flex items-center text-sm gap-2">
                        <MdEmail /> newsshelter
                    </span>
                    <span className="flex items-center text-sm gap-2">
                        <MdEmail /> contact
                    </span>
                    <span className="flex items-center text-sm gap-2">
                        <MdEmail /> FAQ
                    </span>


                </div>
                <div className="flex gap-x-3">
                    <span className="flex items-center text-sm font-semibold gap-2">
                        <HeartIcon className="text-xl" /> Wishlist
                    </span>
                    <div className="text-sm font-semibold flex ">
                        <NavLink to="#">
                            Login
                        </NavLink>
                        <span>
                            /
                        </span>
                        <NavLink to="#">
                            Register
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickAccessBar;