import { useState, useEffect } from 'react';
import { trainers } from '../../../assets/data/ourStaff';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ExpertTrainers: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [trainersPerPage, setTrainersPerPage] = useState(3);
    const sectionRef = useRef(null);  // Create a ref for the section
    const isInView = useInView(sectionRef, { amount: 0.5 });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setTrainersPerPage(1); // Mobile
            } else if (window.innerWidth <= 1024) {
                setTrainersPerPage(2); // Tablet
            } else {
                setTrainersPerPage(3); // Desktop
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? trainers.length - trainersPerPage : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === trainers.length - trainersPerPage ? 0 : prevIndex + 1
        );
    };

    return (
        <section ref={sectionRef} className="py-16 mt-10 bg-black text-white ">
            <h2 className="text-5xl font-bold text-customBlue py-5 text-center  ">Meet the Team</h2>
            <p className="text-lg  text-gray-400 text-center mb-16">
                             Together, we’ll achieve your fitness goals and empower you to live your best life.
                        </p>
            <div className="relative w-full flex justify-center items-center">
                <button
                    onClick={handlePrevClick}
                    className="absolute left-4 text-white bg-customBlue p-2 rounded-full  text-2xl z-10"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                {/* Trainer Cards */}
                <div className="flex justify-center items-center overflow-hidden w-full">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / trainersPerPage)}%)`,
                            width: `${100 * trainers.length / trainersPerPage}%`
                        }}
                    >
                        {trainers.map((trainer) => (
                            <div
                                key={trainer.id}
                                className="flex-shrink-0 w-full opacity-75 p-4 h-80 bg-gray-800 shadow-lg rounded-2xl mx-6 relative overflow-hidden transform transition-transform duration-300 hover:scale-105"
                                style={{
                                    width: `${(100 / trainersPerPage) - 10}%`,
                                    backgroundImage: `url("${trainer.imageUrl}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-center p-4">
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
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-4 rounded-b-2xl text-center"
                                    initial={{ y: 50, opacity: 0 }}  // Starts 50px down and fully transparent
                                    animate={isInView ? { y: 0, opacity: 1 } : {}}   // Moves up to its normal position and becomes fully visible only when in view
                                    transition={{ duration: 1.5, ease: "easeOut" }}  // Timing for the animation
                                >
                                    <p className="text-white font-bold">{trainer.role}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNextClick}
                    className="absolute right-4 text-white bg-customBlue p-2 rounded-full  text-2xl z-10"
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </section>
    );
};

export default ExpertTrainers;
