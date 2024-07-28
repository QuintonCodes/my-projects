import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

interface InputFieldProps {
  autoComplete?: string;
  hasColSpan?: boolean;
  label: string;
  messageField?: boolean;
  name: string;
  type?: string;
}

const ContactForm = ({ children }: { children: ReactNode }) => {
  return (
    <form method="POST" className="mx-auto max-w-xl sm:mt-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {children}

        <div className="flex gap-x-4 sm:col-span-2 items-center">
          <div className="flex items-center">
            <Switch
              className="data-[state=unchecked]:bg-[#292929] data-[state=checked]:bg-[#7F1310]"
              id="policy"
              name="policy"
            />
          </div>
          <Label htmlFor="policy">
            By selecting this, you agree to our privacy policy.
          </Label>
        </div>
        <Button className="col-span-2 bg-[#292929] hover:bg-[#7F1310]">
          Let's Talk
        </Button>
      </div>
    </form>
  );
};

const InputField = ({
  autoComplete,
  hasColSpan,
  label,
  messageField = false,
  name,
  type,
}: InputFieldProps) => {
  return (
    <>
      {messageField ? (
        <div>
          <Label
            htmlFor={name}
            className="block text-sm font-semibold leading-6 text-black"
          >
            {label}
          </Label>
          <Textarea
            className="col-span-2 block bg-[#292929] w-full rounded-md border-0 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            id={name}
            rows={4}
          />
        </div>
      ) : (
        <div className={hasColSpan ? "sm:col-span-2" : ""}>
          <Label
            htmlFor={name}
            className="block text-sm font-semibold leading-6 text-black"
          >
            {label}
          </Label>
          <div className="mt-2.5">
            <Input
              type={type}
              name={name}
              id={name}
              autoComplete={autoComplete}
              className="block bg-[#292929] w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      )}
    </>
  );
};

ContactForm.InputField = InputField;

export default ContactForm;
