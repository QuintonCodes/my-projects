import { ChangeEventHandler, ComponentType, FC } from "react";

interface AuthInputFieldProps {
  icon: ComponentType<{ className: string }>;
  type: string;
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const AuthInputField: FC<AuthInputFieldProps> = ({
  icon: Icon,
  type,
  id,
  label,
  onChange,
}) => {
  return (
    <div className="input-box border-b-2 border-solid border-black h-[60px] my-[30px] mx-0 relative w-full">
      {Icon && (
        <Icon className="h-6 w-6 absolute right-2 top-1/4 leading-[67px]" />
      )}
      <input
        type={type}
        required
        id={id}
        onChange={onChange}
        className="bg-transparent border-none text-base font-normal h-full outline-none p-[10px] w-full"
      />
      <label
        htmlFor={id}
        className="text-[1.2em] font-medium left-[5px] py-0 px-[5px] pointer-events-none absolute top-1/2 -translate-y-1/2 duration-500"
      >
        {label}
      </label>
    </div>
  );
};

export default AuthInputField;
