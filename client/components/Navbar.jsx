"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="w-full max-w-6xl glass-pill rounded-full px-5 py-2.5 sm:px-7 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-300">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1917] text-[#c9a978] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-4 w-4 fill-current" />
          </div>
          <span className="text-lg font-bold tracking-wider text-[#1c1917] uppercase group-hover:text-[#c9a978] transition-colors">
            tapp
          </span>
        </Link>

        {/* Centered Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#716a63]">
          <Link href="#about" className="hover:text-[#1c1917] transition-colors">
            About
          </Link>
          <Link href="#catalog" className="hover:text-[#1c1917] transition-colors">
            Products
          </Link>
          <Link href="#categories" className="hover:text-[#1c1917] transition-colors">
            Services
          </Link>
          <Link href="/docs" className="hover:text-[#1c1917] transition-colors">
            Roadmap
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/submit-product"
            className="flex items-center gap-1.5 rounded-full bg-[#1c1917] hover:bg-black text-[#fbf9f5] px-5 py-2 text-xs font-bold tracking-wide shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            <span>Submit Product</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/submit-product"
            className="rounded-full bg-[#1c1917] text-[#fbf9f5] px-3.5 py-1.5 text-xs font-bold"
          >
            Submit
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#1c1917] hover:bg-black/10"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 sm:hidden glass-pill rounded-3xl p-5 space-y-4 pointer-events-auto shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#1c1917]">
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5"
            >
              About
            </Link>
            <Link
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5"
            >
              Products
            </Link>
            <Link
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5"
            >
              Services
            </Link>
          </nav>
          <div className="pt-2 border-t border-black/8">
            <Link
              href="/submit-product"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#1c1917] text-[#fbf9f5] py-2.5 text-xs font-bold tracking-wide"
            >
              <span>Submit Product</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}