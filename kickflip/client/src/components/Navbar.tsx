import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <header className="items-center bg-[#282828] border-b-2 border-solid border-black flex h-20 justify-between left-0 p-[30px_3%] sticky top-0 w-full z-[999]">
      <div className="flex items-center justify-center">
        <NavLink to="/">
          <img
            src={logo}
            alt="KickFlip Logo"
            height="130px"
            width="130px"
            className="max-[450px]:w-[100px] max-[450px]:h-[100px]"
          />
        </NavLink>

        <ul className="items-center justify-center flex list-none transition-transform duration-300 translate-x-0">
          <li>
            <NavLink
              to="/"
              className="text-white text-base font-semibold ml-10 relative transition duration-500 after:bg-[#7F1310] after:rounded-[5px] after:bottom-[-6px] after:content-[''] after:h-[3px] after:left-0 after:absolute after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:w-full hover:after:scale-x-100 active:text-[#7F1310] hover:text-[#7F1310]"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className="text-white text-base font-semibold ml-10 relative transition duration-500 after:bg-[#7F1310] after:rounded-[5px] after:bottom-[-6px] after:content-[''] after:h-[3px] after:left-0 after:absolute after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:w-full hover:after:scale-x-100 active:text-[#7F1310] hover:text-[#7F1310]"
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-white text-base font-semibold ml-10 relative transition duration-500 after:bg-[#7F1310] after:rounded-[5px] after:bottom-[-6px] after:content-[''] after:h-[3px] after:left-0 after:absolute after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:w-full hover:after:scale-x-100 active:text-[#7F1310] hover:text-[#7F1310]"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <ul className="items-center justify-center flex list-none transition-transform duration-300 translate-x-0">
          <li className="pb-5 px-2">
            <NavLink
              to="/auth"
              aria-label="user"
              className="text-white text-base font-semibold ml-10 relative transition duration-500 after:bg-[#7F1310] after:rounded-[5px] after:bottom-[-6px] after:content-[''] after:h-[3px] after:left-0 after:absolute after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:w-full hover:after:scale-x-100 active:text-[#7F1310] hover:text-[#7F1310]"
            >
              <UserIcon className="h-7 w-7" />
            </NavLink>
          </li>
          <li className="pb-5 px-2">
            <NavLink
              to="/cart"
              aria-label="shopping cart"
              className="text-white text-base font-semibold ml-10 relative transition duration-500 after:bg-[#7F1310] after:rounded-[5px] after:bottom-[-6px] after:content-[''] after:h-[3px] after:left-0 after:absolute after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:w-full hover:after:scale-x-100 active:text-[#7F1310] hover:text-[#7F1310]"
            >
              <div className="relative">
                <ShoppingCartIcon className="h-7 w-7" />
                <span className="absolute text-white px-2 -top-2 -right-2 bg-[#7F1310] rounded-full opacity-75">
                  {0}
                </span>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
