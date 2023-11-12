import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import "../components/navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : "header"}>
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
        <li>
          <NavLink to="/login" activeclassname="active">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" activeclassname="active">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
