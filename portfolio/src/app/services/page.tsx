"use client";

import Card from "@/components/cards";
import { services } from "@/lib/data";
import { motion } from "motion/react";

export default function ServicesPage() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
          initial={{ opacity: 0 }}
        >
          <Card items={services} type="service" />
        </motion.div>
      </div>
    </section>
  );
}
