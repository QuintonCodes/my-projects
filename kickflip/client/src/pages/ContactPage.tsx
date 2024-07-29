import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  return (
    <section className="isolate bg-[#D6D6D6] px-6 py-12 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-5xl font-bold tracking-tight">Contact Us</h2>
        <p className="mt-2 text-xl leading-8 text-black">
          Reach out to us regarding any issues.
        </p>
      </div>

      <ContactForm>
        <ContactForm.InputField
          type="text"
          name="first-name"
          autoComplete="first-name"
          label="First Name"
        />
        <ContactForm.InputField
          type="text"
          name="last-name"
          autoComplete="family-name"
          label="Last Name"
        />
        <ContactForm.InputField
          type="email"
          name="email"
          autoComplete="email"
          label="Email"
          hasColSpan={true}
        />
        <ContactForm.InputField
          type="tel"
          name="phone-number"
          autoComplete="tel"
          label="Phone Number"
          hasColSpan={true}
        />
        <ContactForm.InputField
          type="text"
          name="message"
          label="Message"
          messageField={true}
        />
      </ContactForm>
    </section>
  );
};

export default ContactPage;
