import { FC, ButtonHTMLAttributes } from "react";
import { mergeClasses } from "../utils/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  additionalClasses?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  additionalClasses = "",
  ...props
}) => {
  const defaultButtonClasses =
    "text-base font-medium bg-[#282828] border-none rounded-md text-white cursor-pointer h-[45px] outline-none w-full hover:bg-[#1f1f1f]";

  const buttonClasses = mergeClasses(defaultButtonClasses, additionalClasses);

  return (
    <button {...props} className={buttonClasses}>
      {text}
    </button>
  );
};

export default Button;
