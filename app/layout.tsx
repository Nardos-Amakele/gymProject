// app/layout.tsx
//import '@fortawesome/fontawesome-svg-core/styles.css';
//import { config, Config } from '@fortawesome/fontawesome-svg-core';
//config.autoAddCss =false;

import './globals.css';
import { Inter } from 'next/font/google';




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


        {children}
      </body>
    </html>
  );
}