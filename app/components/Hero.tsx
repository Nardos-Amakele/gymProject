import Link from 'next/link'
import React from 'react'
import styles from '../styles/ButtonStyles.module.css'
import heroImage from '../../assets/images/home_image.png'


const Hero = () => {
  return (
    <div className='pb-28'>
      <section
  className="bg-cover bg-center h-screen items-center justify-between align-middle flex "
  style={{
    backgroundImage: `linear-gradient(to right, black 5%, transparent 100%), url(${heroImage.src})`,
    backgroundSize: '74%',
    backgroundPosition: 'center right',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="container mx-auto px-4 md:px-6 sm:pl-4">
    <div className="lg:w-1/2 md:w-2/3 px-[2.5rem] text-white">
      <h1 className="text-5xl font-bold mb-6 leading-snug">
        ROBI FITNESS <br /> CENTER
      </h1>
      <p className="text-lg mb-8 leading-normal">
        Where strength meets determination. Your journey to a stronger, better you starts here.
      </p>
      <button className={`${styles.customButton} font-bold leading-snug`}>
        <Link href="/Login">Join Now</Link>
      </button>
    </div>
  </div>

  <div className="flex justify-end self-end mx-6 mt-16 mr-16 text-center pb-8">
    <div className="text-white flex space-x-10 mr-16">
      <div>
        <span className="text-customBlue text-2xl font-bold">200+</span>
        <p className="text-base">Members</p>
      </div>
      <div>
        <span className="text-customBlue text-2xl font-bold">5+</span>
        <p className="text-base">Services</p>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero
