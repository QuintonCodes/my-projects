import { FC, ChangeEvent } from "react";

interface ContactMessageFieldProps {
  label: string;
  name: string;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => any;
}

const ContactMessageField: FC<ContactMessageFieldProps> = ({
  label,
  name,
  handleInputChange,
  value,
}) => {
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <textarea
          name={name}
          id={name}
          rows={4}
          value={value}
          onChange={handleInputChange}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
    </div>
  );
};

export default ContactMessageField;
