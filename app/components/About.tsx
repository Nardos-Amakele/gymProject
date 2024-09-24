import React from 'react'
//images
import aboutImage1 from '../../assets/images/image 1.png';
import aboutImage2 from '../../assets/images/image 2.png';
import aboutImage3 from '../../assets/images/image 3.png';
import Image from 'next/image'


const About = () => {
  return (
    <div>
      
<section className="text-white mb-24 px-8">
  <div className="container mx-auto flex flex-col lg:flex-row items-stretch">
    <div className="lg:w-1/2 mb-10 ml-16 flex items-stretch">
      <div className="rounded-xl overflow-hidden h-full w-full transform transition-transform duration-300 hover:scale-105">
        <Image
          src={aboutImage1}
          alt="Water Bottle"
          className="rounded-tl-[164px] rounded-br-[6px] rounded-bl-[6px] w-full h-full object-cover"
          layout="responsive"
        />
      </div>
    </div>

    <div className="lg:w-1/2 lg:pl-12 mr-16 lg:text-start sm:text-center flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-5 text-customBlue">About Us</h2>
        <p className="mb-6 leading-relaxed text-sm text-gray-300 max-w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>
      <div className="flex space-x-6 h-full">
        <div className="w-1/2 h-full flex items-center transform transition-transform duration-300 hover:scale-105">
          <Image
            src={aboutImage2}
            alt="Water Bottle"
            className="rounded-[6px] w-full h-full object-cover"
            layout="responsive"
          />
        </div>
        <div className="w-1/2 h-full flex items-center transform transition-transform duration-300 hover:scale-105">
          <Image
            src={aboutImage3}
            alt="Water Bottle"
            className="rounded-[6px] w-full h-full object-cover"
            layout="responsive"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="mt-8 lg:px-10 mx-auto container">
    <hr className="border-t-8 border-customBlue w-full" />
  </div>
</section>


    </div>
  )
}

export default About
