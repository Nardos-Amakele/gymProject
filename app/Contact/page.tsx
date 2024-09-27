import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

//components
import Header from '../components/Header';  
import Footer from '../components/Footer';  

const Contact = () => {
  return (
    <>
      <Header />

      {/* Contact Us Section */}
      <section className="min-h-screen py-20 flex flex-col items-center justify-center bg-black text-white px-[9rem]">
        <div className="w-full max-w-7xl mx-auto py-10">

        </div>

        <div className="flex flex-wrap justify-between w-full max-w-7xl mx-auto">
          {/* Left Side - Contact Form */}
          <div className="w-full lg:w-1/2 p-6 bg-[#141416]  shadow-lg">
            <h3 className="text-3xl font-semibold text-customBlue mb-6">Contact Us</h3>
            <form className="space-y-6 ">
              <div className="flex space-x-4">
                <input
                  type="text"
                  className="w-1/2 p-3 border border-gray-700 bg-black text-white focus:outline-none focus:border-customBlue rounded-md"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  className="w-1/2 p-3 border border-gray-700 bg-black text-white focus:outline-none focus:border-customBlue rounded-md"
                  placeholder="Email Address"
                />
              </div>
              <input
                type="text"
                className="w-full p-3 border border-gray-700 bg-black text-white focus:outline-none focus:border-customBlue rounded-md"
                placeholder="Subject"
              />
              <textarea
                className="w-full p-3 border border-gray-700 bg-black text-white focus:outline-none focus:border-customBlue rounded-md resize-none"
                placeholder="Message"
              />
              <button
                type="submit"
                className="hover:bg-customHoverBlue bg-customBlue text-white py-3 px-6 rounded-md w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side - Map */}
          <div className="w-full lg:w-1/2 h-[450px] mt-10 lg:mt-0 relative">
            <iframe
              className="w-full h-full shadow-lg opacity-55 hover:opacity-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12093.45863490633!2d-73.9871553!3d40.7488178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x41d5f1c7a2c423a9!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1636577925337!5m2!1sen!2sus"
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>

        {/* Footer Contact Information */}
        <div className="w-full max-w-7xl mx-auto mt-16 flex flex-wrap justify-around text-gray-300 space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-customBlue" />
            <p>Address: Gabriel, Hawassa Building mall, 3rd floor</p>
          </div>
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faPhoneAlt} className="w-6 h-6 text-customBlue" />
            <p>Phone: +251 911 2345 212</p>
          </div>
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-customBlue" />
            <p>Email: Robigym@gym.com</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
