import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  return (
    <section className="isolate bg-eerie-black px-6 py-12 sm:py-12 lg:px-8 bg-[#1f1f1f]">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Contact Us
        </h2>
        <p className="mt-2 text-lg leading-8 text-black">
          Reach out to us regarding any issues.
        </p>
      </div>

      <ContactForm />
    </section>
  );
};

export default ContactPage;
