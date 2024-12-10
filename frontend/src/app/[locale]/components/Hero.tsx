"use client";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/ButtonStyles.module.css";
import heroImage from "@/assets/images/home_image.png";

const Hero = () => {
  const [membersCount, setMembersCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  useEffect(() => {
    const membersTarget = 200;
    const servicesTarget = 5;

    interface CounterSetter {
      (count: number): void;
    }

    const incrementCounter = (
      target: number,
      setter: CounterSetter,
      delay: number
    ): void => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setter(count);
        if (count >= target) {
          clearInterval(interval);
        }
      }, delay);
    };
    incrementCounter(membersTarget, setMembersCount, 10);
    incrementCounter(servicesTarget, setServicesCount, 200);
  }, []);

  const t = useTranslations("home_Page");
  return (
    <div className="pb-8 lg:pb-28 font-jost">
      <section
        className="bg-cover justify-center bg-center h-screen items-center lg:justify-between flex"
        style={{
          backgroundImage: `linear-gradient(to right, black 5%, transparent 100%), url(${heroImage.src})`,
          backgroundSize: "cover", // Change to cover
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 md:px-6 sm:pl-4">
          <motion.div
            className="lg:w-1/2  sm:w-full px-[2.5rem] text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl font-bold mb-6 leading-snug"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            >
              {t("heroSection.title")}
              <br />
              {t("heroSection.titleTwo")}
            </motion.h1>

            <motion.p
              className="text-lg mb-8 leading-normal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              {t("heroSection.subtitle")}
            </motion.p>
            <Link
              href="/Register"
              className="button-custom text-xl text-[#2596BE] border border-solid border-[#2596BE] rounded-md px-5 py-1"
            >
              <span>{t("heroSection.ctaButton")}</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="md:flex hidden md:justify-end md:self-end mx-6 mt-16 mr-16 text-center pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        >
          <div className="text-white flex space-x-10 mr-16">
            <div>
              <motion.span
                className="text-customBlue text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              >
                {membersCount}+
              </motion.span>
              <p className="text-base">{t("heroSection.members")}</p>
            </div>
            <div>
              <motion.span
                className="text-customBlue text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              >
                {servicesCount}+
              </motion.span>
              <p className="text-base">{t("heroSection.services")}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
