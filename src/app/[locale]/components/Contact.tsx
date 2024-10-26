import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';


const Contact = () => {
  const t = useTranslations("home_Page.contactSection");

  return (
    <section className="bg-black text-white py-3 px-6 md:px-[5rem] lg:px-[9rem] pb-16 font-jost">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:items-start lg:items-center justify-between gap-10 lg:gap-80">
        {/* Contact Information */}
        <div className="flex-1 mb-8 md:mb-0 text-center md:text-left">
          <div className="mb-6 flex justify-center md:justify-start items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2596BE] text-2xl mr-4" />
            <p className='text-sm font-thin'>{t("address")}</p>
          </div>

          <div className='flex flex-col gap-4 items-center md:flex-row md:items-center'>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-[#2596BE] text-2xl mr-2" />
              <a href="tel:+2519112345212" className='text-sm font-thin hover:underline'>
                {t("phone")}
              </a>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#2596BE] text-2xl mr-2" />
              <a href="mailto:Robigym@gym.com" className='text-sm font-thin hover:underline'>
                {t("email")}
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="flex-1 text-center md:text-left">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4553.200619973271!2d38.4767155!3d7.0470941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b1458ea4379789%3A0x565bfd7841f22171!2sChapi%20game%20zone%2C%20Hawassa!5e0!3m2!1sen!2set!4v1697670458913!5m2!1sen!2set"
            height="250"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg w-full md:w-[20rem] h-[8.5rem] opacity-65"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Contact;
