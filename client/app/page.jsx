import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Plus,
  Cpu,
  Leaf,
  Layers,
  Terminal,
  Sparkles,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import BackgroundCanvas from "../components/BackgroundCanvas";

const backgroundVideo = {
  src: "https://videos.pexels.com/video-files/45678912/29875684_3840_2160_30fps.mp4",
  poster: "https://images.pexels.com/videos/45678912/preview-4.jpg?auto=compress&cs=tinysrgb&w=1600",
}

export default function Home() {
  const showcaseProducts = [
    {
      id: "solarflow",
      name: "SolarFlow 800",
      category: "CleanTech",
      tagline: "High-efficiency balcony solar microinverter",
      imageUrl: "/showcase-solarflow.svg",
    },
    {
      id: "aeropulse",
      name: "AeroPulse LiDAR",
      category: "Hardware",
      tagline: "Autonomous aerial sensor payload",
      imageUrl: "/showcase-aeropulse.svg",
    },
    {
      id: "hypersync",
      name: "HyperSync Studio",
      category: "SaaS",
      tagline: "CRDT-based collaborative workspace",
      imageUrl: "/showcase-hypersync.svg",
    },
    {
      id: "neurotrace",
      name: "NeuroTrace Vision",
      category: "AI",
      tagline: "Edge neural inference for robotics",
      imageUrl: "/showcase-neurotrace.svg",
    },
  ];

  const categories = [
    { name: "All Products", count: 48, icon: Sparkles, active: true },
    { name: "CleanTech", count: 14, icon: Leaf, active: false },
    { name: "Hardware & IoT", count: 12, icon: Cpu, active: false },
    { name: "SaaS", count: 11, icon: Layers, active: false },
    { name: "Artificial Intelligence", count: 8, icon: Bot, active: false },
    { name: "Developer Tools", count: 7, icon: Terminal, active: false },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0c10] text-[#f4ede4] overflow-x-hidden selection:bg-[#c9a978] selection:text-[#0a0c10]">
      {/* Cinematic animated background on off-black */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e121b] via-[#10141f] to-[#0a0c10]" />
        <video
          className="home-video-backdrop absolute inset-0 h-full w-full object-cover opacity-45"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={backgroundVideo.poster}
          aria-hidden="true"
        >
          <source src={backgroundVideo.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0a0c10]/55" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(201,169,120,0.18),transparent_34%,rgba(79,70,229,0.12)_68%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/30 via-[#0a0c10]/72 to-[#0a0c10]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_64%_54%_at_50%_38%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Massive Watermark Typographic Brand "TAPP" */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 flex justify-center pointer-events-none select-none -z-10 overflow-hidden">
          <span className="watermark-text text-[19vw] font-extrabold tracking-[0.16em] uppercase leading-none opacity-80 scale-y-105">
            TAPP
          </span>
        </div>

        {/* Centered Hero Message Requested by User */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-8 sm:mt-16">
          {/* Subtle Tagline Pill */}
          <div className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-medium text-[#dfcfbd] mb-6 shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-[#c9a978]" />
            <span className="tracking-wide">Premier Product Discovery & Showcase</span>
          </div>

          {/* User Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f4ede4] leading-[1.15] mb-5">
            You build the vision.{" "}
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#dfcfbd] via-[#c9a978] to-[#e8d5c4] bg-clip-text text-transparent">
              We manage the tech.
            </span>
          </h1>

          {/* User Details / Description */}
          <p className="text-sm sm:text-lg text-[#a89a8c] max-w-2xl mx-auto leading-relaxed mb-8">
            You bring the idea. We bring the technology to life. From design to development and deployment, we handle the technical work so you can focus on what matters most—your vision.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#catalog"
              className="flex items-center justify-center gap-2 rounded-full bg-[#f4ede4] hover:bg-white text-[#0a0c10] px-7 py-3 text-xs font-bold tracking-wider uppercase shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span>Explore Directory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/submit-product"
              className="flex items-center justify-center gap-2 rounded-full glass-pill hover:bg-white/10 text-[#dfcfbd] hover:text-white px-7 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95"
            >
              <Plus className="h-3.5 w-3.5 text-[#c9a978]" />
              <span>Submit Product</span>
            </Link>
          </div>
        </div>

        {/* Bottom Horizontal Showcase Row */}
        <div className="relative z-10 mt-16 sm:mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6">
            {/* Left Headline */}
            <div className="max-w-xs">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f4ede4] leading-tight">
                The World Of Innovation
              </h2>
              <p className="text-xs text-[#a89a8c] mt-2 leading-relaxed">
                Unlock the next generation of breakthroughs by exploring a curated selection of products.
              </p>
            </div>

            {/* Horizontal Cards Showcase */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {showcaseProducts.map((product) => (
                <div
                  key={product.id}
                  className="preview-card group relative h-48 rounded-2xl overflow-hidden glass-pill border border-white/10 shadow-xl cursor-pointer"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.75] group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c9a978] mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#dfcfbd] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5 opacity-90">
                      {product.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="catalog" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div id="categories" className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#f4ede4]">Curated Directory</h2>
            <p className="text-sm text-[#a89a8c] mt-1">
              Browse approved launches verified by our curation team.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#a89a8c]">
            <span>Sort by:</span>
            <select className="bg-[#12151f] border border-white/10 rounded-lg px-3 py-1.5 text-[#dfcfbd] focus:outline-none focus:border-[#c9a978]">
              <option>Newest First</option>
              <option>Most Upvoted</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-10">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${cat.active
                  ? "bg-[#f4ede4] text-[#0a0c10] font-bold shadow-md"
                  : "glass-pill text-[#a89a8c] hover:text-white"
                  }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${cat.active ? "bg-[#0a0c10]/20 text-[#0a0c10] font-bold" : "bg-white/10 text-[#dfcfbd]"
                    }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Catalog Showcase Banner */}
        <div className="rounded-3xl glass-pill p-8 sm:p-12 text-center border border-white/10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9a978]/15 border border-[#c9a978]/30 text-[#c9a978] mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f4ede4] mb-2">
            Day 2: Off-Black Architectural Experience Live
          </h3>
          <p className="text-[#a89a8c] text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            The floating frosted pill navigation, animated atmospheric background, and luxury centerpiece watermark &quot;TAPP&quot; are active in rich off-black styling.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-[#dfcfbd]">
              ✨ Rich Off-Black Canvas
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-[#dfcfbd]">
              🏛️ Architectural Watermark &quot;TAPP&quot;
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-[#dfcfbd]">
              🎬 Atmospheric Light Motion
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
