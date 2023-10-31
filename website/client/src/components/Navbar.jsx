import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../components/navbar.css";

function Navbar() {
  return (
    <header className="header">
      <ul className="navbar">
        <NavLink exact="true" to="/" activeclassname="active" className="logo">
          <img src={logo} alt="KickFlip Logo" />
        </NavLink>
        <li className="nav-link">
          <NavLink exact="true" to="/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/shop" activeclassname="active">
            Shop
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/about" activeclassname="active">
            About
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/contact" activeclassname="active">
            Contact
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/cart" activeclassname="active">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
