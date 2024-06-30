import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Instagram, MessageCircle, Youtube } from "lucide-react";

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

      <div className="cursor-pointer ml-1 my-5 flex gap-7">
        <Instagram className="text-white h-8 w-8 duration-300 ease-linear hover:text-[red] hover:scale-110" />
        <MessageCircle className="text-white h-8 w-8 duration-300 ease-linear hover:text-[#0f0] hover:scale-110" />
        <Youtube className="text-white h-8 w-8 duration-300 ease-linear hover:text-[red] hover:scale-110" />
      </div>

      <div className="text-center w-ful7F1310">
        <p className="text-white text-[15px] mb-2">2024, KickFlip</p>
      </div>
    </footer>
  );
};

export default Footer;
