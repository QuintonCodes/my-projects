import { FC } from "react";
import { Link } from "react-router-dom";

interface AuthCheckAccProps {
  check: string;
  link: string;
  text: string;
}

const AuthCheckAcc: FC<AuthCheckAccProps> = ({ check, link, text }) => {
  return (
    <div className="mt-[25px] mx-0 mb-[10px] text-center text-base font-medium">
      <p>
        {check}{" "}
        <Link
          to={link}
          className="font-semibold hover:underline text-[#545484] no-underline"
        >
          {text}
        </Link>
      </p>
    </div>
  );
};

export default AuthCheckAcc;
