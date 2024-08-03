import { Eye, EyeOff } from "lucide-react";
import { ComponentType, forwardRef, useState } from "react";
import InputField from "./InputField";

interface PasswordInputFieldProps {
  error?: string;
  icon: ComponentType<{ className: string }>;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const PasswordInputField = forwardRef<
  HTMLInputElement,
  PasswordInputFieldProps
>(({ error, icon, label, name, onChange, value }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType = isPasswordVisible ? "text" : "password";

  return (
    <div className="relative">
      <InputField
        ref={ref}
        error={error}
        icon={icon}
        label={label}
        name={name}
        onChange={onChange}
        type={inputType}
        value={value}
      />
      <div
        onClick={togglePasswordVisibility}
        className="cursor-pointer absolute right-10 top-1/4"
      >
        {isPasswordVisible ? (
          <EyeOff className="w-6 h-6" />
        ) : (
          <Eye className="w-6 h-6" />
        )}
      </div>
    </div>
  );
});

export default PasswordInputField;
