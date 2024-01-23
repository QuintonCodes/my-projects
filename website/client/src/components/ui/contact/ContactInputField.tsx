import { FC, ChangeEvent } from "react";

interface ContactInputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hasColSpan?: boolean;
}

const ContactInputField: FC<ContactInputFieldProps> = ({
  label,
  name,
  type,
  value,
  handleInputChange,
  hasColSpan = false,
}) => {
  return (
    <div className={hasColSpan ? "sm:col-span-2" : ""}>
      <label
        htmlFor={name}
        className="block text-sm font-semibold leading-6 text-black"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          type={type}
          name={name}
          id={name}
          autoComplete={name}
          value={value}
          onChange={handleInputChange}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ContactInputField;
