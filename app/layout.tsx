// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header'; 
import styles from './styles/ButtonStyles.module.css'; 


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Gym Website',
  description: 'A fitness gym website built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> 

       
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

     

        {children}
      </body>
    </html>
  );
}