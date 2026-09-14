import Link from "next/link";

export default function Navbar() {
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
          <Link href="/" className="text-white transition-colors">
            Explore
          </Link>
          <a href="#directory" className="hover:text-white transition-colors">
            Categories
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#ecosystem" className="hover:text-white transition-colors">
            Ecosystem
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-block text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/submit-product"
            className="relative group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-black bg-[#c9a978] hover:bg-[#dfcfbd] transition-all shadow-lg shadow-[#c9a978]/20"
          >
            <span>+ Submit Product</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}