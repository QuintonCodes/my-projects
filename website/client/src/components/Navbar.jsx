import { NavLink } from "react-router-dom";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.webp";
import "../components/navbar.css";

function Navbar() {
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
            <NavLink to="/about" activeclassname="active">
              About
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
            <ShoppingCartIcon className="h-7 w-7" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
