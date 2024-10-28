// app/layout.tsx
//import '@fortawesome/fontawesome-svg-core/styles.css';
//import { config, Config } from '@fortawesome/fontawesome-svg-core';
//config.autoAddCss =false;
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Header from "./components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "./Shop/_components/CartContext";

const inter = Inter({ subsets: ["latin"], variable:'--font-sans' });

export const metadata = {
  title: "My Gym Website",
  description: "A fitness gym website built with Next.js",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </CartProvider>
      </body>
    </html>
  );
}
