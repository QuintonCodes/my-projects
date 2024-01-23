import { FC } from "react";
import { Link } from "react-router-dom";

interface CartButtonsProps {
  payText: string;
  linkText: string;
}

const CartButtons: FC<CartButtonsProps> = ({ payText, linkText }) => {
  return (
    <div className="flex justify-around max-[450px]:flex-col max-[450px]:items-center">
      <button
        id="Btn"
        className="items-center bg-[#0f0f0f] border-none text-white cursor-pointer flex font-semibold gap-2 h-10 justify-center overflow-hidden relative w-[130px] before:bg-white shadow-[5px_5px_10px_#0000001a] duration-300 active:duration-300 active:translate-x-[5px] active:translate-y-[5px] before:rounded-[50%] before:content-[''] before:h-[130px] before:-left-full before:mix-blend-difference before:absolute before:top-0 before:duration-300 before:w-[130px] hover:before:rounded-none hover:before:translate-x-[100%] hover:before:translate-y-[-50%] hover:before:duration-300"
      >
        {payText}
        <svg className="w-4" viewBox="0 0 576 512">
          <path
            className="fill-white"
            d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"
          ></path>
        </svg>
      </button>

      <p>OR</p>

      <Link to="/shop">
        <button className="rounded border-2 border-black h-10 font-semibold p-2 hover:bg-black hover:text-white transition ease-in-out duration-300 max-[450px]:text-sm max-[450px]:h-11">
          {linkText}
        </button>
      </Link>
    </div>
  );
};

export default CartButtons;
