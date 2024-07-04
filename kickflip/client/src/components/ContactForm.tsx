import ContactInputField from "./ContactInputField";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

const ContactForm = () => {
  return (
    <form method="POST" className="mx-auto max-w-xl sm:mt-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <ContactInputField type="text" name="first-name" label="First Name" />
        <ContactInputField type="text" name="last-name" label="Last Name" />
        <ContactInputField
          type="email"
          name="email"
          label="Email"
          hasColSpan={true}
        />
        <ContactInputField
          type="tel"
          name="phone-number"
          label="Phone Number"
          hasColSpan={true}
        />
        <Label
          htmlFor="message"
          className="block text-sm font-semibold leading-6 text-black"
        >
          Message
        </Label>
        <Textarea
          className="col-span-2 block bg-[#292929] w-full rounded-md border-0 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
          id="message"
          rows={4}
        />
        <div className="flex gap-x-4 sm:col-span-2 items-center">
          <div className="flex items-center">
            <Switch
              className="data-[state=unchecked]:bg-[#292929] data-[state=checked]:bg-[#7F1310]"
              id="policy"
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

export default ContactForm;
