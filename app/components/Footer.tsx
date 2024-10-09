import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook, faYoutube, faTiktok, faTelegram } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-customBlue text-black py-10">
      <div className="container mx-auto items-center px-4 sm:px-10 md:px-20 max-w-screen-xl">
        <div className="flex flex-col md:flex-row md:justify-between ">
          <div className="mb-8 md:mb-0">
            <h1 className="font-extrabold text-lg">LOGO</h1>
          </div>
          <div className="flex flex-wrap justify-center md:justify-between gap-16 text-xs md:text-sm lg:text-sm">
            <div>
              <h2 className="font-bold">Company</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">About</li>
                <li className="cursor-pointer">Philosophy</li>
                <li className="cursor-pointer">Facilities</li>
                <li className="cursor-pointer">Team</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Explore</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">Shop</li>
                <li className="cursor-pointer">Company</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Product</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">Clothing</li>
                <li className="cursor-pointer">Supplement</li>
                <li className="cursor-pointer">Equipment</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Support</h2>
              <ul className="mt-6 space-y-2">
                <li className="cursor-pointer">BMI</li>
                <li className="cursor-pointer">Address</li>
                <li className="cursor-pointer">Phone</li>
                <li className="cursor-pointer">Email</li>
                <li className="cursor-pointer">Feedback</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-t border-black my-6 mt-20" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            <a href="/terms" className="mr-6 hover:underline">Term & Conditions</a>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/robifitnesscentre/" aria-label="Instagram"  target="_blank" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://www.tiktok.com/@robi77fitness#:~:text=Robifitness%F0%9F%87%AA%F0%9F%87%B9%F0%9F%92%AAhawass%20(@robi77fitness)" aria-label="TikTok"  target="_blank" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faTiktok} size="lg" />
            </a>
            <a href="#" aria-label="Facebook"  target="_blank" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://t.me/robifitness" aria-label="Telegram"  target="_blank" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faTelegram} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
