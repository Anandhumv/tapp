import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Plus,
  Compass,
  Cpu,
  Leaf,
  Layers,
  Bot,
  Terminal,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Home() {
  const categories = [
    { name: "All Innovations", count: 48, icon: Sparkles, active: true },
    { name: "CleanTech", count: 14, icon: Leaf, active: false },
    { name: "Hardware & IoT", count: 12, icon: Cpu, active: false },
    { name: "SaaS", count: 11, icon: Layers, active: false },
    { name: "Artificial Intelligence", count: 8, icon: Bot, active: false },
    { name: "Developer Tools", count: 7, icon: Terminal, active: false },
  ];

  const stats = [
    { label: "Curated Launches", value: "500+", icon: TrendingUp },
    { label: "Active Innovators", value: "12,000+", icon: Users },
    { label: "Vetted & Verified", value: "100%", icon: ShieldCheck },
  ];

  return (
    <div className="relative flex flex-col items-center justify-start overflow-hidden">
      {/* Ambient Gradient Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-500/15 via-violet-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300 shadow-inner backdrop-blur-md mb-8 hover:border-indigo-400/50 transition-all cursor-default">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span>Curated Platform for Next-Gen Tech & Makers</span>
          <span className="h-1 w-1 rounded-full bg-indigo-400" />
          <span className="text-zinc-400">Day 2 Live</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Discover the Future of Products,{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Built by Innovators.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
          The open showcase and discovery catalog for next-generation clean tech, hardware engineering, AI models, and software craft.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="#catalog"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all active:scale-95"
          >
            <Compass className="h-4 w-4" />
            <span>Explore Directory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/submit-product"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 hover:border-zinc-700 px-7 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white transition-all active:scale-95 backdrop-blur-sm"
          >
            <Plus className="h-4 w-4 text-indigo-400" />
            <span>Submit a Product</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-3.5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-5 py-4 backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold tracking-tight text-white">{stat.value}</div>
                  <div className="text-xs text-zinc-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="catalog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-800/60">
        <div id="categories" className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Curated Directory</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Browse approved launches verified by our curation team.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Sort by:</span>
            <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-indigo-500">
              <option>Newest First</option>
              <option>Most Upvoted</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-10">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  cat.active
                    ? "bg-white text-zinc-950 shadow-md font-semibold"
                    : "bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    cat.active ? "bg-zinc-200 text-zinc-950 font-bold" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Day 2 Preview Banner & Architecture Preview */}
        <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 via-zinc-900/40 to-zinc-950/60 p-8 sm:p-12 text-center backdrop-blur-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Day 2 Foundation Complete
          </h3>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-6">
            The shell layout, sticky navigation bar, dark theme design system, and hero banner are live. In Day 3, this space transforms into the responsive 3-column product card grid with live interactive cards and dynamic routes!
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <span className="rounded-full bg-zinc-800/80 border border-zinc-700/60 px-3.5 py-1.5 text-zinc-300">
              ⚡ Next.js 16 App Router
            </span>
            <span className="rounded-full bg-zinc-800/80 border border-zinc-700/60 px-3.5 py-1.5 text-zinc-300">
              🎨 Tailwind CSS v4 Theme
            </span>
            <span className="rounded-full bg-zinc-800/80 border border-zinc-700/60 px-3.5 py-1.5 text-zinc-300">
              🔒 Responsive Shell Ready
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
