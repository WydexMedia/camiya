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
  keywords: "diamond jewelry, natural diamonds, luxury jewelry, diamond rings, diamond earrings, diamond necklaces, diamond bracelets, Camiya Diamonds, India jewelry",
  authors: [{ name: "Camiya Diamonds" }],
  creator: "Camiya Diamonds",
  publisher: "Camiya Diamonds",
  icons: {
    icon: '/favicon.ico'
  },
  verification: {
    google: "SfKGiAV2-I-iWD9Vp8RpW4Vq4jP5NFJq6ONr-90etn0"
  },
  openGraph: {
    title: "Camiya Diamonds - Natural Diamond Jewelry",
    description: "Discover our exquisite collection of handcrafted diamond jewelry, where every piece tells a story of luxury and authenticity.",
    url: "https://camiyadiamonds.com",
    siteName: "Camiya Diamonds",
    images: [
      {
        url: "/images/camiya-logo.png",
        width: 1200,
        height: 630,
        alt: "Camiya Diamonds - Natural Diamond Jewelry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camiya Diamonds - Natural Diamond Jewelry",
    description: "Discover our exquisite collection of handcrafted diamond jewelry, where every piece tells a story of luxury and authenticity.",
    images: ["/images/camiya-logo.png"],
    creator: "@camiyadiamonds",
    site: "@camiyadiamonds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'facebook:app_id': 'https://www.facebook.com/camiyadiamonds/',
    'instagram:username': 'https://www.instagram.com/camiya.diamonds/',
    'pinterest:username': 'camiyadiamonds',
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
