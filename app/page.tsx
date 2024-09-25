'use client'

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
import Hero from './components/Hero';
import About from './components/About';


import Testimonials from './components/Testimonials';
import BMICalculator from './components/BMIcalculator';
export default function Home() {
  return (
  
    <body>
    <main>
      <Header /> 
    <>

      <Hero/>
      <About/>
      <OurServices />
      <BMICalculator/>
      <Shop />
      <Supporting />
      <Contact />
      <Testimonials />
      
    </>
      <Footer/> 
    </main>
    </body>
  )
}
