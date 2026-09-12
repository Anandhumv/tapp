"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Plus, Search, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-cyan-400 shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-indigo-400">
              tapp<span className="text-indigo-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Explore
            </Link>
            <Link
              href="/#categories"
              className="transition-colors hover:text-white"
            >
              Categories
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-white"
            >
              Roadmap
            </Link>
          </nav>
        </div>

        {/* Search Cue & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              className="h-9 w-48 lg:w-64 rounded-full border border-zinc-800 bg-zinc-900/80 pl-9 pr-10 text-xs text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <kbd className="absolute right-2.5 rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
              ⌘K
            </kbd>
          </div>

          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/submit-product"
            className="flex items-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Submit Product</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/submit-product"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white"
            aria-label="Submit Product"
          >
            <Plus className="h-4 w-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-zinc-800 bg-zinc-950/95 px-4 pt-3 pb-6 space-y-4 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-9 rounded-lg border border-zinc-800 bg-zinc-900 pl-9 pr-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-zinc-300">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white"
            >
              Explore Directory
            </Link>
            <Link
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white"
            >
              Categories
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white"
            >
              Sign In
            </Link>
          </div>

          <div className="pt-2 border-t border-zinc-800/80">
            <Link
              href="/submit-product"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Submit Product for Review
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
