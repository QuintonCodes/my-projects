"use client";

import ServiceCard, { Service } from "@/components/service-card";
import { motion } from "motion/react";

const services: Service[] = [
  {
    num: "01",
    title: "Web Development",
    description: "Developing the frontend and backend for websites",
  },
  {
    num: "02",
    title: "Logo Design",
    description: "Creating logos for businesses for any use case",
  },
  {
    num: "03",
    title: "Software Development",
    description: "Writing and maintaining software code for applications",
  },
];

const ServicesPage = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;
