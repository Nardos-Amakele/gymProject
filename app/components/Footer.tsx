import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
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
                <li>Random</li>
                <li>Company</li>
                <li>Random</li>
                <li>Ipsum</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Explore</h2>
              <ul className="mt-6 space-y-2">
                <li>Random</li>
                <li>Ipsum</li>
                <li>Company</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Support</h2>
              <ul className="mt-6 space-y-2">
                <li>Company</li>
                <li>Random</li>
                <li>Ipsum</li>
                <li>Company</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Product</h2>
              <ul className="mt-6 space-y-2">
                <li>Random</li>
                <li>Company</li>
                <li>Random</li>
                <li>Ipsum</li>
                <li>Company</li>
                <li>Ipsum</li>
                <li>Company</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-t border-black my-6 mt-20" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            <a href="#" className="mr-6 hover:underline">Term</a>
            <a href="#" className="hover:underline">Policy</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="#" aria-label="Facebook" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" aria-label="YouTube" className="transition-transform duration-200 hover:scale-110">
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
