"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut, ShieldCheck, Sparkles } from "lucide-react";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";

const NAV_LINKS = [
  { label: "Work / Projects", href: "/#directory" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { role, loading } = useAuth();
  const isAdmin = !loading && role === "admin";

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
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-heading transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isAdmin && (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-line-hover text-xs font-semibold text-accent hover:text-accent-strong transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-alt border border-line hover:border-line-hover text-xs font-medium text-body hover:text-heading transition-all active:scale-95"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
