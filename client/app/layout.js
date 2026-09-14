import { Space_Grotesk } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

// Configure the Space Grotesk Google font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Set page metadata
export const metadata = {
  title: "TAPP — Curated Hardware, Clean-Tech & AI Software Discovery",
  description: "Bespoke clean-tech, autonomous robotics, and AI platform discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body
        className={`${spaceGrotesk.className} min-h-screen bg-[#0c0c0e] text-[#fafafa] selection:bg-[#c9a978]/30 selection:text-[#c9a978] antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-white/10 py-12 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-zinc-300">TAPP</span>
            <span>—</span>
            <span>Luxury Hardware & Clean-Tech Ecosystem</span>
          </div>
          <div>© 2026 TAPP Inc. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}