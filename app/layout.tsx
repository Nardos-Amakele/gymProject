// app/layout.tsx
//import '@fortawesome/fontawesome-svg-core/styles.css';
//import { config, Config } from '@fortawesome/fontawesome-svg-core';
//config.autoAddCss =false;

import Header from './components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './Shop/_components/CartContext';




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

        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}