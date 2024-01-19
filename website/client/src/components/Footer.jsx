import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.webp";

function Footer() {
  return (
    <>
      <footer className="flex flex-wrap justify-between px-[50px] border-t-2 border-solid border-black bg-[#282828]">
        <div className="items-start flex flex-col mb-5 text-white">
          <Link to="/">
            <img
              src={logo}
              alt="Logo of KickFlip"
              height="130px"
              width="130px"
            />
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

        <div className="p-5 items-start flex flex-col mb-5 text-white max-[450px]:p-0 max-[1024px]:p-2">
          <form className="flex flex-col p-5 bg-transparent border-2 border-solid border-[#ffffff0d] rounded-[10px] max-w-[350px] max-[450px]:max-w-[300px]">
            <span className="text-[#ebebeb] text-[2rem] font-bold tracking-tight leading-8">
              Subscribe to our newsletter
            </span>
            <p className="text-base mt-4 text-[15px] mb-2 text-[#ebebeb]">
              Get email updates to our latest content and sales
            </p>
            <div
              id="email-section"
              className="flex max-w-md mt-4 gap-x-2 max-[450px]:flex-col"
            >
              <input
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email-address"
                autoComplete="email"
                className="bg-[#1b1b1b] border border-solid border-[#808080] rounded-md text-white flex-auto text-sm outline-none py-2 px-[0.875rem] focus:border focus:border-solid focus:border-[#faebd7] placeholder:text-white"
              />
              <button
                type="submit"
                className="bg-[#3a3a3a] hover:bg-[#3d3d3d] transition-colors duration-300 rounded-md border-none text-[#ebebeb] cursor-pointer font-semibold text-sm outline-none py-[0.625rem] px-[0.875rem] max-[450px]:m-3"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mr-10 mt-5 items-start flex flex-col mb-5 text-white max-[1024px]:mr-0">
          <h4 className="font-bold">My Account</h4>
          <Link
            to="/register"
            className="text-[15px] mb-[10px] hover:text-[#545484] transition-colors duration-300"
          >
            Sign in
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
          <p className="text-white text-[15px] mb-2">2023, KickFlip</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
