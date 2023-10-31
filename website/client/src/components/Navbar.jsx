import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../components/navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : "header"}>
      <NavLink exact="true" to="/" activeclassname="active" className="logo">
        <img src={logo} alt="KickFlip Logo" />
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
        <li>
          <NavLink to="/cart" activeclassname="active">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
          </NavLink>
        </li>
      </ul>

      <div className="menu">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>
    </header>
  );
}

export default Navbar;
