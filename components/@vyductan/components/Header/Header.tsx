import Image from "next/image";
import logo from "../../../public/logo.png";
import HeaderIcon from "./HeaderIcon";
import { navItems } from "./data/nav";
import Icon from "../../Icon";
import Right from "./Right";
import { ButtonOpenSidebar } from "../Sidebar/Sidebar";
const Left = () => {
  return (
    <div className="flex items-center space-x-3">
      <ButtonOpenSidebar />
      <Image alt="logo" src={logo} width={40} height={40} layout="fixed" />
      <div className="flex items-center rounded-full bg-gray-100 p-2">
        <Icon name="Search" className="h-6 text-gray-600" />
        <input
          className="hidden flex flex-shrink ml-1 items-center bg-transparent outline-none placeholder-gray-500
          lg:inline-flex"
          type="text"
          placeholder="Search Facebook"
        />
      </div>
    </div>
  );
};

const Center = () => {
  return (
    <div className="flex justify-center flex-grow opacity-0 md:opacity-100">
      <div className="flex space-x-6 md:space-x-2">
        {navItems.map((x) => {
          const active = x.iconName === "HomeOutline";
          return (
            <HeaderIcon
              key={x.iconName}
              tooltip={x.name}
              active={active}
              icon={{
                type: x.iconType,
                name: active ? x.iconActive : x.iconName,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div
      className="flex items-center sticky top-0 z-50 bg-white px-2 shadow-md
      lg:px-5 py-2"
    >
      <Left />

      <Center />

      <Right />
    </div>
  );
};

export default Header;
