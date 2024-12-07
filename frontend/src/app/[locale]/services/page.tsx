"use client";

import React, { useState, useRef, useEffect } from "react";
import ServiceCard from "./ServicesCards";
import servicesHero from "@/assets/images/services_hero.jpg";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/src/i18n/routing";



interface ServiceType {
  id: number;
  name: string;
  price: number;
  description: {
    benefits: string[];
  };
  preferred: boolean;
  category: TabName;
}

type TabName =
  | "Body Building"
  | "Exercise"
  | "Group Fitness"
  | "Personal Training";

const Page = () => {
  const t = useTranslations("services_page");
  const router = useRouter();

  const [services, setServices] = useState<{
    [key in TabName]?: ServiceType[];
  }>({});
  const [activeTab, setActiveTab] = useState<TabName>("Body Building");

  const tabs: TabName[] = [
    "Body Building",
    "Exercise",
    "Group Fitness",
    "Personal Training",
  ];

  const descriptions: Record<TabName, string> = {
    "Body Building":
      "Achieve your fitness goals with our dedicated bodybuilding packages.",
    Exercise:
      "Stay fit and energized with various exercise options for all levels.",
    "Group Fitness":
      "Join our group fitness classes for a fun and dynamic workout experience.",
    "Personal Training":
      "Get personalized attention with our 1-on-1 coaching and tailored plans.",
  };
  const pathname = usePathname();


  const currentLocale = pathname.split("/")[1] || routing.defaultLocale; // Get the current locale from the pathname
const segments = pathname.split("/");
const pathnameWithoutLocale = segments.slice(2).join("/"); // Extract path after locale


  const fetchServices = async () => {
    
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      const data = response.data.data;
      const categorizedServices: { [key in TabName]?: ServiceType[] } = {};

      data.forEach((service: ServiceType) => {
        const category = service.category as TabName;
        if (tabs.includes(category)) {
          categorizedServices[category] = [
            ...(categorizedServices[category] || []),
            service,
          ];
        }
      });

      setServices(categorizedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceClick = (packageName: string) => {
    const queryParams = new URLSearchParams({
      category: activeTab,
      package: encodeURIComponent(packageName),
    }).toString();
  
    router.push(
      `/${currentLocale}/Register`
    );
      };
  
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isJumping, setIsJumping] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isJumping) {
      timeoutId = setTimeout(() => {
        setIsJumping(false);
      }, 1200);
    } else {
      timeoutId = setTimeout(() => {
        setIsJumping(true);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isJumping]);

  return (
    <>
      <Header />
      <div className="bg-black text-white space-y-6">
        <div
          className="relative w-full h-[100vh] bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${servicesHero.src})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold text-white"
            >
              {t("hero.title")}
            </motion.h1>
            <div className="flex justify-center pt-4">
              <motion.div
                onClick={scrollToNextSection}
                className="bottom-4 justify-center border border-white rounded-full p-4 cursor-pointer text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isJumping ? { y: [0, -10, 0] } : {}}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: isJumping ? 1 : 0,
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="text-white text-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={nextSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-gray-800 rounded-2xl w-fit flex flex-wrap justify-center p-2 mx-auto space-x-4 mb-16 border-solid border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-bold ${
                activeTab === tab
                  ? "text-[#2596BE]"
                  : "text-gray-400 bg-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-400 mt-4">
          {descriptions[activeTab]}
        </p>

        <div className="flex flex-wrap gap-6 justify-center mt-8">
          {services[activeTab]?.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.name}
              price={`Birr ${service.price}`}
              benefits={service.description.benefits}
              isPremium={service.preferred}
              onClick={() => handleServiceClick(service.name)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
