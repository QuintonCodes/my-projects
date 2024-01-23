import { FC } from "react";

interface AuthCheckBoxProps {
  text: string;
  forgotPassword?: boolean;
}

const AuthCheckBox: FC<AuthCheckBoxProps> = ({
  text,
  forgotPassword = false,
}) => {
  return (
    <div className="flex text-[0.9em] font-medium justify-between mt-[-15px] mx-0 mb-[15px]">
      <label htmlFor="checkbox">
        <input type="checkbox" id="terms" className="accent-black mr-[3px]" />
        {text}
      </label>
      {forgotPassword && (
        <a href="#" className="hover:underline text-[#545484] no-underline">
          Forgot Password?
        </a>
      )}
    </div>
  );
};

export default AuthCheckBox;
