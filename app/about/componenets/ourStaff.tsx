import { useEffect, useRef } from 'react';
import { trainers } from '../../../assets/data/ourStaff';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { motion, useInView } from 'framer-motion';

const ExpertTrainers: React.FC = () => {
    const sectionRef = useRef(null); // Create a ref for the section
    const isInView = useInView(sectionRef, { amount: 0.5 });

    return (
        <section ref={sectionRef} className="py-16 mt-10 bg-black text-white ">
            <h2 className="text-5xl font-bold text-customBlue py-5 text-center">Meet the Team</h2>
            <p className="text-lg text-gray-400 text-center mb-16">
                Together, we’ll achieve your fitness goals and empower you to live your best life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-[9rem]">
                {trainers.map((trainer) => (
                    <div
                        key={trainer.id}
                        className="relative overflow-hidden  transform transition-transform duration-300 hover:scale-105"
                    >
                        <div
                            className="w-full h-80 bg-cover bg-center"
                            style={{ backgroundImage: `url("${trainer.imageUrl}")` }}
                        ></div>

                        {/* Overlay with trainer details */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-300 opacity-0 hover:opacity-100">
                            <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                            <div className="flex space-x-2">
                                <a
                                    href={`https://t.me/${trainer.telegram}`} // Telegram link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-customBlue"
                                >
                                    <FontAwesomeIcon icon={faTelegram} className="text-2xl hover:text-white" />
                                </a>
                                <a
                                    href={trainer.facebook ? `https://facebook.com/${trainer.facebook}` : '#'} // Facebook link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-customBlue hover:underline"
                                >
                                    <FontAwesomeIcon icon={faFacebook} className="text-2xl hover:text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Role text with animation (always visible) */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-4 rounded-b-2xl text-center"
                            initial={{ y: 50, opacity: 0 }} // Starts 50px down and fully transparent
                            animate={isInView ? { y: 0, opacity: 1 } : {}} // Moves up to its normal position and becomes fully visible only when in view
                            transition={{ duration: 1.5, ease: 'easeOut' }} // Timing for the animation
                        >
                            <p className="text-white font-bold">{trainer.role}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExpertTrainers;
