'use client'
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import aboutUsHero from '../../assets/images/aboutus_hero.jpg';
import ourPhilo from '../../assets/images/philosophy.jpeg';
import trainers from '../../assets/images/trainers.jpg';
import { motion } from 'framer-motion';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import style from '../styles/ButtonStyles.module.css'
import Link from 'next/link';


const AboutUsPage = () => {
    const [isJumping, setIsJumping] = useState(true);
    const nextSectionRef = useRef<HTMLDivElement | null>(null);
    const scrollToNextSection = () => {
        if (nextSectionRef.current) {
          nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isJumping) {
          timeoutId = setTimeout(() => {
            setIsJumping(false);
          }, 1200);
        } else {
          timeoutId = setTimeout(() => {
            setIsJumping(true);
          }, 3000);
        }
        return () => clearTimeout(timeoutId);
      }, [isJumping]);
    return (
        <>
            <Header />
            <div className="bg-black text-white scroll-container relative">
                {/* Neon Line - Connected and fixed */}
                <motion.div
                    className="absolute top-0 left-[50%] h-full w-1 bg-[#2596BE] neon-glow hidden lg:block"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                ></motion.div>

                {/* Hero Section */}
                <div className=" relative w-full h-[100vh] bg-fixed bg-center bg-cover"
                    style={{ backgroundImage: `url(${aboutUsHero.src})`, backgroundAttachment: 'fixed' }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col   items-center justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl font-bold text-white "
                        >
                            About Us
                        </motion.h1>
                        <div className="flex justify-center pt-4">
        <motion.div
          onClick={scrollToNextSection}
          className="bottom-4 justify-center border border-white rounded-full p-4 cursor-pointer text-white"
          whileHover={{ scale: 1.1 }}  // Hover effect for smoother interaction
          whileTap={{ scale: 0.9 }}    // Tap effect for feedback
          animate={isJumping ? { y: [0, -10, 0] } : {}}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut", 
            repeat: isJumping ? 1 : 0, // Jump twice
          }}  
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-white text-xl" />
        </motion.div>
      </div>
                    </div>
                </div>

                {/* Section 1 - About Robi Fitness */}
                <section className="scroll-section sm:px-[5rem] md:px-[9rem] sm:py-2 md:py-20" ref={nextSectionRef}>
                    <section className="flex flex-col md:flex-row items-center pt-12 gap-20">
                        <div className="md:w-1/2 px-6">
                            <div className="relative">
                                <motion.h2
                                    className="text-[7rem] font-bold text-gray-800 tracking-tight"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.8, x: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    01
                                </motion.h2>
                                <motion.h2
                                    className="absolute top-1/2 left-0 text-2xl font-semibold mb-6 text-[#2596BE] transform -translate-y-1/2"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    About Robi Fitness
                                </motion.h2>
                            </div>

                            <motion.p
                                className="text-base leading-relaxed text-gray-400 mt-[-1.5rem]"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                Robi Fitness is dedicated to fostering a supportive environment where individuals of all fitness levels can thrive.
                                Our gym offers state-of-the-art equipment and expert trainers who are passionate about helping you achieve your fitness goals.
                            </motion.p>
                        </div>

                        <motion.div
                            className="w-full lg:w-1/2 relative md:h-80 h-60 lg:h-60 "
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src={aboutUsHero}
                                alt="About Robi Fitness"
                                objectFit="cover"
                                className="rounded-lg"
                                layout="fill"
                            />
                        </motion.div>
                    </section>

                    {/* Section 2 - Our Philosophy */}
                    <section className="scroll-section flex flex-col md:flex-row items-center py-14 gap-20 ">
                        <motion.div
                            className="w-full lg:w-1/2 relative md:h-80 h-60 lg:h-60"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src={ourPhilo}
                                alt="Our Philosophy"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </motion.div>

                        <div className="md:w-1/2 px-6">
                            <div className='relative'>
                                <motion.h2
                                    className="text-[7rem]  font-bold text-gray-800 tracking-tight"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.8 }}
                                    transition={{ duration: 1 }}
                                >
                                    02
                                </motion.h2>
                                <motion.h2
                                    className="text-2xl font-semibold mb-6 text-[#2596BE] absolute top-1/2 left-0 transform -translate-y-1/2"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    Our Philosophy
                                </motion.h2>
                            </div>
                            <motion.p
                                className="text-base leading-relaxed text-gray-400 mt-[-1.5rem]"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                At Robi Fitness, we believe in a holistic approach to health and wellness. Fitness isn't just about physical strength — it's about building mental resilience, confidence, and overall well-being.
                            </motion.p>
                        </div>
                    </section>

                    {/* Section 3 - Our Facilities & Trainers */}
                    <section className="scroll-section flex flex-col md:flex-row items-center  gap-20">
                        <div className="md:w-1/2 sm:w-full sm:px-0 px-6">
                            <div className='relative'>
                                <motion.h2
                                    className="text-[7rem] font-bold text-gray-800 tracking-tight"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.8 }}
                                    transition={{ duration: 1 }}
                                >
                                    03
                                </motion.h2>
                                <motion.h2
                                    className="text-2xl font-semibold mb-6 text-[#2596BE] absolute top-1/2 left-0 transform -translate-y-1/2"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    Our Facilities & Trainers
                                </motion.h2>
                            </div>
                            <motion.p
                                className="text-base leading-relaxed text-gray-400 mt-[-1.5rem]"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                Robi Fitness is equipped with the latest fitness technology and an inspiring space designed for every fitness level. Our experienced trainers are here to support your growth, offering personalized guidance to help you maximize your potential.
                            </motion.p>
                        </div>

                        <motion.div
                            className="w-full lg:w-1/2 relative md:h-80 h-60 lg:h-60"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src={trainers}
                                alt="Our Facilities"
                                objectFit="cover"
                                className="rounded-lg"
                                layout="fill"
                            />
                        </motion.div>
                    </section>
                </section>
            </div>
            {/* Join Us Section */}
            <div>
                <section className='py-10'>
            <motion.section
                        className="py-16 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-semibold mb-6 text-[#2596BE]">Step into Robi Fitness today and discover a new way to work out.</h2>
                        <p className="text-lg mb-8 text-gray-400">
                             Together, we’ll achieve your fitness goals and empower you to live your best life.
                        </p>
                        <Link href='/Signup'>
                        <motion.button
                            className={style.customButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join Robi Fitness Now
                        </motion.button>
                        </Link>
                    </motion.section>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUsPage;
