import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.webp";
import { ShopContext } from "../context/shop-context";
import "../components/navbar.css";

function Navbar() {
  const { cartItems } = useContext(ShopContext);

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header className="header">
      <div className="header-left">
        <NavLink exact="true" to="/" activeclassname="active" className="logo">
          <img src={logo} alt="KickFlip Logo" height="130px" width="130px" />
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink exact="true" to="/" activeclassname="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" activeclassname="active">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeclassname="active">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <ul className="navbar-links">
        <li className="pb-5 px-2">
          <NavLink to="/login" activeclassname="active" aria-label="user">
            <UserIcon className="h-7 w-7" />
          </NavLink>
        </li>
        <li className="pb-5 px-2">
          <NavLink
            to="/cart"
            activeclassname="active"
            aria-label="shopping cart"
          >
            <div className="relative">
              <ShoppingCartIcon className="h-7 w-7" />
              {totalItemsInCart > 0 && (
                <span className="absolute text-white px-2 -top-2 -right-2 bg-[#9595b2] rounded-full opacity-75">
                  {totalItemsInCart}
                </span>
              )}
            </div>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
