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

        {children}
      </body>
    </html>
  );
}