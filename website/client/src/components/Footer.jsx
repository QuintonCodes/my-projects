import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.webp";
import "../components/footer.css";

function Footer() {
  return (
    <>
      <footer className="flex flex-wrap justify-between">
        <div id="col">
          <Link to="/">
            <img
              src={logo}
              alt="Logo of KickFlip"
              height="130px"
              width="130px"
            />
          </Link>

          <div className="mr-2.5">
            <FontAwesomeIcon icon={faInstagram} id="icon" size="xl" />
            <FontAwesomeIcon icon={faWhatsapp} id="icon" size="xl" />
            <FontAwesomeIcon icon={faTiktok} size="xl" />
          </div>
        </div>

        <div className="p-5" id="col">
          <form id="subscribe" className="flex flex-col p-5 bg-transparent">
            <span className="title">Subscribe to our newsletter</span>
            <p id="description" className="text-base mt-4">
              Get email updates to our latest content and sales
            </p>
            <div id="email-section" className="flex max-w-md mt-4">
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

        <div className="mr-10 mt-5" id="col">
          <h4>My Account</h4>
          <Link to="/login">Sign in</Link>
          <Link to="/cart">View Cart</Link>
          <Link to="/shop">Shop Now</Link>
          <Link to="/contact">Help</Link>
        </div>

        <div className="text-center w-full">
          <p>2023, KickFlip</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
