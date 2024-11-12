"use client";
import React from "react";
import { Link } from "../../../i18n/routing";
import ServiceCard from "./ServiceCard";
import Service3 from "@/assets/images/personal.jpg";
import Service1 from "@/assets/images/service_image1.png";
import Service2 from "@/assets/images/aerobics.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const services = [
  {
    key: "weightLifting", // Add a key for referencing the translation
    icon: "dumbbell",
    imageSrc: Service1,
  },
  {
    key: "aerobics", // Add a key for referencing the translation
    icon: "running",
    imageSrc: Service2,
  },
  {
    key: "personalTraining", // Add a key for referencing the translation
    icon: "user",
    imageSrc: Service3,
  },
];

const OurServices = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const t = useTranslations("home_Page");

  return (
    <motion.section
      ref={ref}
      id="services"
      className="py-16 bg-black text-white px-4 sm:px-8 md:px-16 lg:px-[9rem] font-jost"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">

        <Link href="/services">
          <h2 className="text-6xl font-bold text-[#2596BE] mb-4">
            {t("servicesSection.title")}
          </h2>
        </Link>
        <p className="text-sm text-gray-300 mb-12 max-w-sm">
          {t("heroSection.services")} {/* here we need to add an approproate description*/}

        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {services.map((service, index) => (
            <div className="w-full sm:w-auto p-4 sm:p-0" key={index}>
              {/* Link the service images to /services */}
              <Link href="/services">
                <ServiceCard
                  title={t(`servicesSection.services.${service.key}.title`)} 
                  description={t(`servicesSection.services.${service.key}.description`)} 
                  icon={service.icon}
                  imageSrc={service.imageSrc}
                />
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurServices;
