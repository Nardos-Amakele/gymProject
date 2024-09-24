'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/ButtonStyles.module.css'
import heroImage from '../../assets/images/home_image.png'

const Hero = () => {
  const [membersCount, setMembersCount] = useState(0)
  const [servicesCount, setServicesCount] = useState(0)
  useEffect(() => {
    const membersTarget = 200
    const servicesTarget = 5

    interface CounterSetter {
      (count: number): void;
    }

    const incrementCounter = (target: number, setter: CounterSetter, delay: number): void => {
      let count = 0;
      const interval = setInterval(() => {
      count += 1;
      setter(count);
      if (count >= target) {
        clearInterval(interval);
      }
      }, delay);
    };
    incrementCounter(membersTarget, setMembersCount, 10) 
    incrementCounter(servicesTarget, setServicesCount, 200) 

  }, [])

  return (
    <div className="pb-28">
      <section
        className="bg-cover bg-center h-screen items-center justify-between align-middle flex"
        style={{
          backgroundImage: `linear-gradient(to right, black 5%, transparent 100%), url(${heroImage.src})`,
          backgroundSize: '74%',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4 md:px-6 sm:pl-4">
          <motion.div
            className="lg:w-1/2 md:w-2/3 px-[2.5rem] text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-5xl font-bold mb-6 leading-snug"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
            >
              ROBI FITNESS <br /> CENTER
            </motion.h1>

            <motion.p
              className="text-lg mb-8 leading-normal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
            >
              Where strength meets determination. Your journey to a stronger, better you starts here.
            </motion.p>

            <motion.button
              className={`${styles.customButton} font-bold leading-snug`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href="/Login">Join Now</Link>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-end self-end mx-6 mt-16 mr-16 text-center pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
        >
          <div className="text-white flex space-x-10 mr-16">
            <div>
              <motion.span
                className="text-customBlue text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
              >
                {membersCount}+
              </motion.span>
              <p className="text-base">Members</p>
            </div>
            <div>
              <motion.span
                className="text-customBlue text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
              >
                {servicesCount}+
              </motion.span>
              <p className="text-base">Services</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Hero
