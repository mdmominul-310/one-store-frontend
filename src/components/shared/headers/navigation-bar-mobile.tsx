import { Link } from "react-router-dom";
import logo from "/full_logo.png";
import { useState } from "react";
import { Drawer } from "antd";
import DropDown from "@/components/ui/DropDown";
import { useGetMenuQuery } from "@/store/services/menuApiSlice";
import { FiMenu } from "react-icons/fi";

const NavBarMobile = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetMenuQuery({});
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between px-4  items-center">
        <div className="border-r-[1px] border-gray-300 pr-3 py-3 flex items-center">
          <button onClick={showDrawer}>
            <FiMenu className="text-2xl  text-gray-500" />
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <Link to={"/"}>
            <img className="w-[180px] h-[30px]" src={logo} alt="Logo" />
          </Link>
        </div>

        <div></div>
      </div>

      <Drawer
        title="Items"
        onClose={onClose}
        open={open}
        placement="left"
        width={200}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data?.data?.map(
              (item: {
                _id: string;
                name: string;
                children: [{ label: string; title: string; _id: string }];
              }) => (
                <div key={item._id}>
                  <DropDown
                    label={item.name}
                    items={item?.children?.map((subItem) => ({
                      key: subItem._id,
                      label: (
                        <Link to={`/categories/${subItem.title}`}>
                          {subItem.title}
                        </Link>
                      ),
                    }))}
                  />
                </div>
              )
            )}
          </div>
        )}
      </Drawer>
    </>
  );
};

export default NavBarMobile;
