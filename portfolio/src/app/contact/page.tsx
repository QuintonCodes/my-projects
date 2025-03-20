"use client";

import Card from "@/components/cards";
import Form from "@/components/form";
import { contactData } from "@/lib/data";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <motion.section
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-2"
      initial={{ opacity: 0 }}
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <Form />

          <Card items={contactData} type="contact" />
        </div>
      </div>
    </motion.section>
  );
}
