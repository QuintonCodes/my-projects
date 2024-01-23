import { FC } from "react";

const ContactFormButton: FC = () => {
  return (
    <div className="mt-5">
      <button
        type="submit"
        className="block bg-[#282828] w-full rounded-md bg-grey-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#3a3a3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a3a3a]"
      >
        Let`s Talk
      </button>
    </div>
  );
};

export default ContactFormButton;
