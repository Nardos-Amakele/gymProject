'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faYoutube,
  faTiktok,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logos/logo-second.svg";
import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing";
import TermsAndConditionsModal from "./TermsAndConditionsModal";



const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const t = useTranslations("home_Page.footerSection");

  return (
    <footer className="bg-customBlue text-black py-10">
      <div className="container mx-auto items-center px-4 sm:px-10 md:px-20 max-w-screen-xl">
        <div className="flex flex-col md:flex-row md:justify-between ">
          <div className="mb-8 md:mb-0 w-40">
            <Image src={logo} alt="logo"></Image>
          </div>
          <div className="flex flex-wrap justify-center md:justify-between gap-16 text-xs md:text-sm lg:text-sm">
            <div>
              <h2 className="font-bold">{t('company.title')}</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">
                  <Link href="/about" className="hover:underline">
                    {t('company.links.0')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/about#our-philosophy"  className="hover:underline">
                    {t('company.links.1')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/about#our-Facilities" className="hover:underline">
                    {t('company.links.2')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/about#our-Team" className="hover:underline">
                    {t('company.links.3')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">{t('explore.title')}</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">
                  <Link href="/service" className="hover:underline">
                    {t('explore.links.0')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/Shop" className="hover:underline">
                    {t('explore.links.1')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">{t('shopCategories.title')}</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">
                  <Link href="/Shop" className="hover:underline">
                    {t('shopCategories.links.0')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/Shop" className="hover:underline">
                    {t('shopCategories.links.1')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/Shop" className="hover:underline">
                    {t('shopCategories.links.2')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">{t('support.title')}</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">
                  <Link href="/#bmi" className="hover:underline">
                    {t('support.links.0')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/Contact#address" className="hover:underline">
                    {t('support.links.1')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/Contact#phone" className="hover:underline">
                    {t('support.links.2')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/Contact#email" className="hover:underline">
                    {t('support.links.3')}
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/Contact#feedback" className="hover:underline">
                    {t('support.links.4')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-t border-black my-6 mt-20" />
        <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
      <div className="text-sm mb-4 md:mb-0">
        <button onClick={openModal} className="mr-6 hover:underline">
          {t('support.links.5')}
        </button>
      </div>

      {/* Modal component */}
      <TermsAndConditionsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/robifitnesscentre/"
              aria-label="Instagram"
              target="_blank"
              className="transition-transform duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://www.tiktok.com/@robi77fitness#:~:text=Robifitness%F0%9F%87%AA%F0%9F%87%B9%F0%9F%92%AAhawass%20(@robi77fitness)"
              aria-label="TikTok"
              target="_blank"
              className="transition-transform duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faTiktok} size="lg" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              target="_blank"
              className="transition-transform duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://t.me/robifitness"
              aria-label="Telegram"
              target="_blank"
              className="transition-transform duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faTelegram} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
