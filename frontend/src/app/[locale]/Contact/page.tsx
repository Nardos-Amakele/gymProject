import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslations } from 'next-intl';

const Contact = () => {
  const t = useTranslations("contact_page");

  return (
    <>
      <Header />

      {/* Contact Us Section */}
      <section className="min-h-screen py-36 flex flex-col items-center justify-center bg-black text-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">{t("heading")}</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-around items-start w-full max-w-7xl px-6">

          {/* Left Side - Contact Information */}
          <div className="flex flex-col justify-center items-start p-8 w-full md:w-1/3 space-y-6 mb-8 mt-4 md:mb-0">
            <div className="space-y-10">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-customBlue">{t("details.address.label")}</h3>
                  <p className="text-white">{t("details.address.value")}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <FontAwesomeIcon icon={faPhoneAlt} className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-customBlue">{t("details.phone.label")}</h3>
                  <p className="text-white">+251 911 2345 212</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-customBlue">{t("details.email.label")}</h3>
                  <p className="text-white">Robigym@gym.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-[#141416] text-gray-100 p-8 shadow-lg rounded-lg w-full md:w-1/3 border-[0.5px] border-customBlue">
            <h3 className="text-3xl text-center font-semibold text-customBlue mb-6">{t("feedback_form.heading")}</h3>
            <form className="space-y-6">
              <input
                type="text"
                className="w-full p-3 border-b-2 border-gray-500 bg-[#141416] text-white focus:outline-none focus:border-customBlue rounded-md"
                placeholder={t("feedback_form.fields.full_name")}
                required
              />
              <input
                type="email"
                className="w-full p-3 border-b-2 border-gray-500 bg-[#141416] text-white focus:outline-none focus:border-customBlue rounded-md"
                placeholder={t("feedback_form.fields.email")}
                required
              />
              <textarea
                className="w-full p-3 border-b-2 border-gray-500 bg-[#141416] text-white focus:outline-none focus:border-customBlue resize-none rounded-md"
                placeholder={t("feedback_form.fields.message")}
                required
              />
              <button
                type="submit"
                className="hover:bg-customHoverBlue bg-customBlue text-white p-3 w-full rounded-md transition"
              >
                {t("feedback_form.submit_button")}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;