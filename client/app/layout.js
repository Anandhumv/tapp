import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "tapp — Discover & Showcase Next-Gen Products",
  description:
    "The curated community showcase and discovery platform for cutting-edge hardware, clean technology, and modern software craft.",
  keywords: ["products", "hardware", "cleantech", "saas", "ai", "product directory", "showcase"],
  openGraph: {
    title: "tapp — Discover & Showcase Next-Gen Products",
    description:
      "Curated platform for creators, makers, and innovators to submit and discover revolutionary tech.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
