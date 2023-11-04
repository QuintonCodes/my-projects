import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import "../components/footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="col">
          <Link to="/">
            <img src={logo} alt="Logo of KickFlip" />
          </Link>

          <div className="socials">
            <FontAwesomeIcon icon={faInstagram} id="icon" size="xl" />
            <FontAwesomeIcon icon={faWhatsapp} id="icon" size="xl" />
            <FontAwesomeIcon icon={faTiktok} size="xl" />
          </div>
        </div>

        <div className="col newsletter">
          <form className="subscribe">
            <span className="title">Subscribe to our newsletter</span>
            <p className="description">
              Get email updates to our latest content and sales
            </p>
            <div className="email-section">
              <input
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email-address"
                autoComplete="email"
              />
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>

        <div className="col account">
          <h4>My Account</h4>
          <Link to="/login">Sign in</Link>
          <Link to="/cart">View Cart</Link>
          <Link to="/shop">Shop Now</Link>
          <Link to="/contact">Help</Link>
        </div>

        <div className="copyright">
          <p>
            <FontAwesomeIcon
              icon={faCopyright}
              size="lg"
              style={{ color: "#000000" }}
            />
            2023, KickFlip
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
