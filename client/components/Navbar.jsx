"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut, ShieldCheck, User, Sparkles } from "lucide-react";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  async function handleSignOut() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between w-full max-w-6xl px-5 py-3 rounded-full glass-pill">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-strong text-black shadow-inner">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-display font-bold tracking-wide text-sm bg-gradient-to-r from-heading via-heading to-accent bg-clip-text text-transparent">
            TAPP
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-body">
          <Link href="/" className="hover:text-heading transition-colors">
            Explore
          </Link>
          <Link href="/#directory" className="hover:text-heading transition-colors">
            Categories
          </Link>
          <Link href="/services" className="hover:text-heading transition-colors">
            Services
          </Link>
          <Link href="/#ecosystem" className="hover:text-heading transition-colors">
            Ecosystem
          </Link>
          {role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-accent hover:text-accent-strong transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle variant="navbar" className="hidden sm:flex" />

          {!loading && user ? (
            <>
              <Link
                href="/profile"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-bg-alt border border-line-hover text-accent hover:text-heading transition-all shadow-md hover:scale-105 active:scale-95"
                title="Profile Settings"
                aria-label="Profile Settings"
              >
                <User className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-surface" />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-alt border border-line hover:border-line-hover text-xs font-medium text-body hover:text-heading transition-all active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-xs font-medium text-body hover:text-heading transition-colors px-3 py-1.5 rounded-full bg-bg-alt border border-line hover:border-line-hover"
            >
              Sign In
            </Link>
          )}
          <Link
            href="/submit-product"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-accent to-accent-strong hover:brightness-110 transition-all shadow-lg shadow-accent/20"
          >
            <span>+ Add Product</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
