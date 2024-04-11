import { useState, FormEvent, FC, ChangeEvent } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import ContactInputField from "../components/ui/contact/ContactInputField";
import ContactMessageField from "../components/ui/contact/ContactMessageField";
import ContactSwitchGroup from "../components/ui/contact/ContactSwitchGroup";
import { useFormInput } from "../hooks/useFormInput";
import { useSendEmail } from "../hooks/useSendEmail";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactPage: FC = () => {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [formData, handleInputChange] = useFormInput<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const sendEmail = useSendEmail(
    formData,
    () => alert("Email sent successfully!"),
    () => alert("Failed to send email.")
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to our privacy policy.");
      return;
    }
    sendEmail();
  };

  return (
    <>
      <Navbar />

      <section className="isolate bg-eerie-black px-6 py-12 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 text-lg leading-8 text-black">
            Reach out to us regarding any issues.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="mx-auto max-w-xl sm:mt-10"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <ContactInputField
              type="text"
              name="first-name"
              label="First Name"
              handleInputChange={handleInputChange}
              value={formData.firstName}
            />
            <ContactInputField
              type="text"
              name="last-name"
              label="Last Name"
              handleInputChange={handleInputChange}
              value={formData.lastName}
            />
            <ContactInputField
              type="email"
              name="email"
              label="Email"
              handleInputChange={handleInputChange}
              value={formData.email}
              hasColSpan={true}
            />
            <ContactInputField
              type="tel"
              name="phone-number"
              label="Phone Number"
              handleInputChange={handleInputChange}
              value={formData.phoneNumber}
              hasColSpan={true}
            />
            <ContactMessageField
              name="message"
              label="Message"
              handleInputChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange(e)
              }
              value={formData.message}
            />

            <ContactSwitchGroup agreed={agreed} setAgreed={setAgreed} />
          </div>
          <div className="mt-5">
            <Button
              text="Let`s Talk"
              additionalClasses="bg-[#282828] block bg-grey-600 px-3.5 py-2.5 text-center text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a3a3a]"
            />
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
