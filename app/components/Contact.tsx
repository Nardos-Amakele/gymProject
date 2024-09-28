import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

const Contact = () => {
  return (
    <section className="bg-black text-white py-3 px-6 md:px-[5rem] lg:px-[9rem] pb-16 font-jost">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:items-start lg:items-center justify-between gap-10 lg:gap-80">
        {/* Contact Information */}
        <div className="flex-1 mb-8 md:mb-0 text-center md:text-left">
          <div className="mb-6 flex justify-center md:justify-start items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2596BE] text-2xl mr-4" />
            <p className='text-sm font-thin'>Gabriel, Hawassa Building mall 3rd floor</p>
          </div>

          <div className='flex flex-col gap-4 items-center md:flex-row md:items-center'>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-[#2596BE] text-2xl mr-2" />
              <a href="tel:+2519112345212" className='text-sm font-thin hover:underline'>
                +251 911 2345 212
              </a>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#2596BE] text-2xl mr-2" />
              <a href="mailto:Robigym@gym.com" className='text-sm font-thin hover:underline'>
                Robigym@gym.com
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="flex-1 text-center md:text-left">
          <iframe
            src="https://www.google.com/maps/embed?pb=<your-embed-link>"
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
