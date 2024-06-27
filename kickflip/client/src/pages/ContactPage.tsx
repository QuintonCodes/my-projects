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

      <ContactForm />
    </section>
  );
};

export default ContactPage;
