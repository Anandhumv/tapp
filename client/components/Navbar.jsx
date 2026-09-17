"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut, ShieldCheck, User } from "lucide-react";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  async function handleSignOut() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-full bg-[#18181b]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a978] to-[#9a7b4c] text-black font-bold text-sm shadow-inner">
            TP
          </div>
          <span className="font-bold tracking-wider text-sm bg-gradient-to-r from-white via-zinc-200 to-[#c9a978] bg-clip-text text-transparent">
            TAPP
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/#directory" className="hover:text-white transition-colors">
            Categories
          </Link>
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <Link href="/#ecosystem" className="hover:text-white transition-colors">
            Ecosystem
          </Link>
          {role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-[#c9a978] hover:text-[#dfcfbd] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {!loading && user ? (
            <>
              <Link
                href="/profile"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-[#131316] border border-[#c9a978]/60 hover:border-[#c9a978] text-[#c9a978] hover:text-white transition-all shadow-md shadow-[#c9a978]/10 hover:scale-105 active:scale-95"
                title="Profile Settings"
                aria-label="Profile Settings"
              >
                <User className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#18181b]" />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-xs font-medium text-zinc-400 hover:text-white transition-all active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
