import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import { AuthProvider } from "../lib/AuthContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

// Set page metadata
export const metadata = {
  title: "TAPP — Curated Hardware, Clean-Tech & AI Software Discovery",
  description: "Bespoke clean-tech, autonomous robotics, and AI platform discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${caveat.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-heading font-sans selection:bg-accent/30 selection:text-accent antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ThemeToggle />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
