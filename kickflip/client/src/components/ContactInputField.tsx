interface ContactInputFieldProps {
  label: string;
  name: string;
  type: string;
  //   value: string;
  hasColSpan?: boolean;
}

const ContactInputField = ({
  label,
  name,
  type,
  //   value,
  hasColSpan,
}: ContactInputFieldProps) => {
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
          //   value={value}
          className="block bg-[#292929] w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ContactInputField;
