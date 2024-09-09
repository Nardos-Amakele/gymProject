import Image from 'next/image'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false;
import OurServices from './components/OurServices';
import Shop from './components/Shops';
export default function Home() {
  return (
    <>
      <OurServices />
      <Shop />
    </>
  )
}
