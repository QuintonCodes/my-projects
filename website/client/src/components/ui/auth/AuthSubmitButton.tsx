import { FC } from "react";

interface AuthSubmitButtonProps {
  text: string;
}

const AuthSubmitButton: FC<AuthSubmitButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="text-base font-medium bg-[#282828] border-none rounded-md text-white cursor-pointer h-[45px] outline-none w-full hover:bg-[#1f1f1f]"
    >
      {text}
    </button>
  );
};

export default AuthSubmitButton;
