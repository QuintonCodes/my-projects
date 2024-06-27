import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between px-[50px] border-t-2 border-solid border-black bg-[#282828]">
      <div className="text-white">
        <Link to="/">
          <img src={logo} alt="Logo of KickFlip" height="130px" width="130px" />
        </Link>
      </div>

      <div className="items-start flex my-5 text-white gap-10">
        <Link
          to="/auth"
          className="text-[15px] hover:text-[#7F1310] transition-colors duration-300"
        >
          Login
        </Link>
        <Link
          to="/auth"
          className="text-[15px] hover:text-[#7F1310] transition-colors duration-300"
        >
          Sign up
        </Link>
        <Link
          to="/cart"
          className="text-[15px] hover:text-[#7F1310] transition-colors duration-300"
        >
          View Cart
        </Link>
        <Link
          to="/shop"
          className="text-[15px] hover:text-[#7F1310] transition-colors duration-300"
        >
          Shop Now
        </Link>
        <Link
          to="/contact"
          className="text-[15px] hover:text-[#7F1310] transition-colors duration-300"
        >
          Help
        </Link>
      </div>

      <div className="cursor-pointer ml-1 my-5">
        <FontAwesomeIcon
          icon={faInstagram}
          size="xl"
          className="text-white px-[13px] duration-300 ease-linear hover:text-[red] translate-y-[-15%]"
        />
        <FontAwesomeIcon
          icon={faWhatsapp}
          size="xl"
          className="text-white px-[13px] duration-300 ease-linear hover:text-[#0f0] translate-y-[-15%]"
        />
        <FontAwesomeIcon
          icon={faTiktok}
          size="xl"
          className="text-white px-[13px] duration-300 ease-linear hover:text-[#d65cff] translate-y-[-15%]"
        />
      </div>

      <div className="text-center w-ful7F1310">
        <p className="text-white text-[15px] mb-2">2024, KickFlip</p>
      </div>
    </footer>
  );
};

export default Footer;
