import Image from 'next/image'
import Header from './components/Header'; 
import styles from './styles/ButtonStyles.module.css'; 
import Footer from './components/Footer'

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false;
import OurServices from './components/OurServices';
import Shop from './components/Shops';
import Supporting from './components/Supporting';
import Contact from './components/Contact';
export default function Home() {
  return (
  
    <main>
              <Header /> 
              <>
      <OurServices />
      <Shop />
      <Supporting />
      <Contact />
    </>

       
<section
  className="bg-cover bg-center h-screen items-center justify-between" 
  style={{ backgroundImage: "url('/path-to-your-image.jpg')",
    marginTop: '130px'
  }} 
>

  <div className="container mx-auto px-2">
    <div className="w-1/2 text-white ">
      <h1 className="text-5xl font-bold mb-6 leading-snug">ROBI FITNESS CENTER</h1>
      <p className="text-base mb-8 leading-normal">Where strength meets determination. Your journey to a stronger, better you starts here.</p>
      <button className={`${styles.customButton} font-bold leading-snug`}>
Join Now
</button>
    </div>
  </div>
  <div className="flex justify-end mx-6 mt-16 mr-16 text-center"> 
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

<section className="text-white mb-24 px-8">
<div className="container mx-auto flex flex-col lg:flex-row items-center">
<div className="lg:w-1/2 mb-10 ml-16">
<div className="rounded-xl overflow-hidden">
<img
  src="/images/gym-interior.jpg"
  alt="Gym Interior"
  className="w-full h-full object-cover"
/>
</div>
</div>
<div className="lg:w-1/2 lg:pl-12 mr-16 lg:text-start sm:text-center">
<h2 className="text-xl font-bold mb-6 text-customBlue">About Us</h2>
<p className="text-base mb-6 leading-relaxed">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
</p>
<div className="flex space-x-4">
<div className="w-1/2">
  <img
    src="/images/image-1.jpg"
    alt="Gym activity 1"
    className="rounded-lg object-cover"
  />
</div>
<div className="w-1/2">
  <img
    src="/images/image-2.jpg"
    alt="Gym activity 2"
    className="rounded-lg object-cover"
  />
</div>
</div>
</div>
</div>
<div className="mt-8 lg:px-10 mx-auto container">
<hr className="border-t-8 border-customBlue w-full" />
</div>
</section>

<Footer/> 
    </main>
  )
}
