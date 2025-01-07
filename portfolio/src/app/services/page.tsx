"use client";

import ServiceCard from "@/components/service-card";
import { servicesData } from "@/data/info-data";
import { motion } from "motion/react";

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
          {servicesData.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;
