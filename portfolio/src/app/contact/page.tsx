"use client";

import ContactCard from "@/components/contact-card";
import Form from "@/components/form";
import { motion } from "motion/react";

const ContactPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-2"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <Form />
          <ContactCard />
        </div>
      </div>
    </motion.section>
  );
};

export default ContactPage;
