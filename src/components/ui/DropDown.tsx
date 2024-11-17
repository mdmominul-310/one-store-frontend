import { Dropdown, MenuProps, Space } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";

const DropDown: React.FC<{ label: string, items: MenuProps['items'] }> = ({ label, items }: { label: string, items: MenuProps['items'] }): JSX.Element => (
    <Dropdown menu={{ items }} className="ml-10 ">
        <a onClick={(e) => e.preventDefault()}>
            <Space className="text-black hover:text-primary group-hover:text-primary cursor-pointer">
                {label}
                <MdKeyboardArrowDown />
            </Space>
        </a>
    </Dropdown>
);

export default DropDown;