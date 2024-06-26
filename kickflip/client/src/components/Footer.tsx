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
    <footer className="flex flex-wrap justify-between px-[50px] border-t-2 border-solid border-black bg-[#282828]">
      <div className="items-start flex flex-col mb-5 text-white">
        <Link to="/">
          <img src={logo} alt="Logo of KickFlip" height="130px" width="130px" />
        </Link>

        <div className="mr-2.5 cursor-pointer">
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
      </div>

      <div className="mr-10 mt-5 items-start flex flex-col mb-5 text-white max-[1024px]:mr-0">
        <h4 className="font-bold pb-3">My Account</h4>
        <Link
          to="/login"
          className="text-[15px] mb-[10px] hover:text-[#545484] transition-colors duration-300"
        >
          Login
        </Link>
        <Link
          to="/cart"
          className="text-[15px] mb-[10px] hover:text-[#545484] transition-colors duration-300"
        >
          View Cart
        </Link>
        <Link
          to="/shop"
          className="text-[15px] mb-[10px] hover:text-[#545484] transition-colors duration-300"
        >
          Shop Now
        </Link>
        <Link
          to="/contact"
          className="text-[15px] mb-[10px] hover:text-[#545484] transition-colors duration-300"
        >
          Help
        </Link>
      </div>

      <div className="text-center w-full">
        <p className="text-white text-[15px] mb-2">2024, KickFlip</p>
      </div>
    </footer>
  );
};

export default Footer;
