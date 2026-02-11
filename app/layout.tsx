import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chopstick-sepia.vercel.app'),
  title: "Chopsticks Spice Malabar | 25 Years of Culinary Excellence",
  description: "Experience the finest Malabar, Chinese, and Tandoori cuisine in Pune. 25 years of authentic flavors and tradition.",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-cream text-accent`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
