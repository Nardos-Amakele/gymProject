// app/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// app/layout.tsx
import "./globals.css";
import "./styles/fonts.css";
import { Inter } from "next/font/google";
import { CartProvider } from "./Shop/_components/CartContext";
import { ServiceProvider } from "./admin/components/serviceContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
      <body className={`font-jost ${inter.className}`}>
        <ServiceProvider>
          <CartProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </CartProvider>
        </ServiceProvider>
      </body>
    </html>
  );
}
