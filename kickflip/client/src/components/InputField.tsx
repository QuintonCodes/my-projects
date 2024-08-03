import { ComponentType, forwardRef } from "react";

interface InputFieldProps {
  error?: string;
  icon: ComponentType<{ className: string }>;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  value: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ error, icon: Icon, label, name, onChange, type, value }, ref) => {
    return (
      <div className="input-box border-b-2 border-solid border-black h-[60px] my-[30px] mx-0 relative w-full flex items-center flex-row-reverse">
        <Icon className="h-6 w-6 absolute right-2 top-1/4 leading-[67px]" />
        <input
          autoComplete={
            type === "password" ? "current-password" : label.toLowerCase()
          }
          id={name}
          name={name}
          onChange={onChange}
          required
          type={type}
          value={value}
          ref={ref}
          className="bg-transparent border-none text-base font-normal h-full outline-none p-[10px] w-full"
        />
        <label
          htmlFor={name}
          className="text-[1.2em] font-medium left-[5px] py-0 px-[5px] pointer-events-none absolute top-1/2 -translate-y-1/2 duration-300 peer-focus:top-[-5px] peer-focus:text-[0.8em] peer-valid:top-[-5px] peer-valid:text-[0.8em]"
        >
          {label}
        </label>
        {error && (
          <p className="text-red-600 text-sm absolute top-full">{error}</p>
        )}
      </div>
    );
  }
);

export default InputField;
