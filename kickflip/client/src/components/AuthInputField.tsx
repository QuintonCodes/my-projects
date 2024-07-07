import { ComponentType } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputFieldProps {
  icon: ComponentType<{ className: string }>;
  type: string;
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
}

const AuthInputField = ({
  icon: Icon,
  type,
  id,
  label,
  value,
  onChange,
  togglePasswordVisibility,
  isPasswordVisible,
}: AuthInputFieldProps) => {
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="input-box border-b-2 border-solid border-black h-[60px] my-[30px] mx-0 relative w-full flex items-center flex-row-reverse">
      {type === "password" && togglePasswordVisibility && (
        <div
          onClick={togglePasswordVisibility}
          className="cursor-pointer mr-12"
        >
          {isPasswordVisible ? (
            <EyeOff className="w-6 h-6" />
          ) : (
            <Eye className="w-6 h-6" />
          )}
        </div>
      )}
      <Icon className="h-6 w-6 absolute right-2 top-1/4 leading-[67px]" />
      <input
        type={inputType}
        required
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="bg-transparent border-none text-base font-normal h-full outline-none p-[10px] w-full"
      />
      <label
        htmlFor={id}
        className="text-[1.2em] font-medium left-[5px] py-0 px-[5px] pointer-events-none absolute top-1/2 -translate-y-1/2 duration-300 peer-focus:top-[-5px] peer-focus:text-[0.8em] peer-valid:top-[-5px] peer-valid:text-[0.8em]"
      >
        {label}
      </label>
    </div>
  );
};

export default AuthInputField;
