import type { Metadata } from "next";
import { Geist, Geist_Mono, Allura, Dancing_Script } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "./components/WishlistContext";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allura = Allura({
  weight: "400",
  variable: "--font-allura",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camiya Diamonds",
  description: "Camiya Diamonds is a leading diamond jewellery brand in India, offering a wide range of diamond jewelry for men and women.",
  icons: {
    icon: 
    '/favicon.ico'
  },
  verification: {
    google: "SfKGiAV2-I-iWD9Vp8RpW4Vq4jP5NFJq6ONr-90etn0"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allura.variable} ${dancingScript.variable} antialiased`}
      >
        <WishlistProvider>
          {children}
          <Toaster />

        </WishlistProvider>
      </body>
    </html>
  );
}
