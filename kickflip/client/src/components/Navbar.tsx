import { NavLink } from "react-router-dom";
import { ShoppingCart, UserRound } from "lucide-react";
import logo from "../assets/logo.png";
import { Avatar } from "./ui/avatar";
import Menu from "./Menu";
import { useAppSelector } from "../hooks/reduxHooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const items = useAppSelector((state) => state.cart.items);

  console.log("User details:", user);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `text-base font-semibold ml-10 relative transition duration-500 after:bg-[#7F1310] after:rounded-[5px] after:bottom-[-6px] after:content-[''] after:h-[3px] after:left-0 after:absolute after:origin-right after:transition-transform after:duration-500 after:w-full hover:after:scale-x-100 active:text-[#7F1310] hover:text-[#7F1310] ${
      isActive
        ? "text-[#7F1310] after:scale-x-100"
        : "text-white after:scale-x-0"
    }`;
  };

  return (
    <header className="items-center bg-[#282828] border-b-2 border-solid border-black flex h-20 justify-between left-0 p-[30px_3%] sticky top-0 w-full z-10">
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
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop?category=all" className={getNavLinkClass}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-center">
        <ul className="items-center justify-center flex list-none transition-transform duration-300 translate-x-0">
          <li className="pb-5 px-2">
            {user ? (
              <div className="text-base font-semibold mr-2 relative mt-5 text-white">
                <Menu>
                  <Avatar className="items-center justify-center border border-black bg-[#acacac] bg-opacity-50 cursor-pointer">
                    {user.name.charAt(0)}
                  </Avatar>
                </Menu>
              </div>
            ) : (
              <NavLink
                to="/auth/signup"
                aria-label="user"
                className={getNavLinkClass}
              >
                <UserRound className="h-7 w-7" />
              </NavLink>
            )}
          </li>
          <li className="pb-5 px-2">
            <NavLink
              to="/cart"
              aria-label="shopping cart"
              className={getNavLinkClass}
            >
              <div className="relative">
                <ShoppingCart className="h-7 w-7" />
                {totalItems > 0 && (
                  <span className="absolute text-white px-2 -top-2 -right-2 bg-[#7F1310] rounded-full opacity-75">
                    {totalItems}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
