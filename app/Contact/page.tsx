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
      <section className="min-h-screen my-10 flex flex-col items-center justify-center bg-black text-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex flex-wrap justify-around items-start w-full max-w-7xl px-6">
          
          {/* Left Side - Contact Information */}
          <div className="flex flex-col justify-center items-start  p-8 w-full md:w-1/3 space-y-6 mb-8 mt-4 md:mb-0">
            <div className="space-y-10">
              <div className="flex items-center  space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-customBlue">Address</h3>
                  <p className="text-white">Gabriel, Hawassa Building mall <br/> 3rd floor</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <FontAwesomeIcon icon={faPhoneAlt} className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-customBlue">Phone</h3>
                  <p className="text-white">+251 911 2345 212</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-customBlue">Email</h3>
                  <p className="text-white">Robigym@gym.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white text-gray-900 p-8 shadow-lg  w-full md:w-1/3">
            <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-customBlue"
                placeholder="Full Name"
              />
              <input
                type="email"
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-customBlue"
                placeholder="Email"
              />
              <textarea
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-customBlue"
                placeholder="Type your Message..."
              />
              <button
                type="submit"
                className="hover:bg-customBlue bg-customHoverBlue text-white p-2 w-1/3 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Contact;
