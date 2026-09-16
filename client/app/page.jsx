import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

// Initial seed items matching the curated index
const featuredProducts = [
  {
    id: "prod-1",
    name: "Aether Sol-X Grid Module",
    category: "CleanTech",
    tagline: "Next-gen photovoltaic energy router with 99.4% efficiency.",
    description:
      "Engineered for extreme climates, featuring onboard neural predictive load balancing and military-grade cutover switches.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    supplier: "Aether Systems",
    supplierInitials: "AS",
  },
  {
    id: "prod-2",
    name: "Vortex K-9 Robotic Core",
    category: "Autonomous Systems",
    tagline: "Sub-millimeter spatial mapping and automated assembly unit.",
    description:
      "Powered by dual edge-TPUs, delivering sub-millisecond reaction times for complex warehouse and autonomous factory operations.",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    supplier: "Vortex Dynamics",
    supplierInitials: "VK",
  },
  {
    id: "prod-3",
    name: "Cognitive Blade 04",
    category: "AI Hardware",
    tagline: "High-density liquid-cooled inferencing accelerator.",
    description:
      "Custom tensor matrix architecture optimized for large language models with zero-latency token streaming.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    supplier: "Cognitive Silicon",
    supplierInitials: "CB",
  },
  {
    id: "prod-4",
    name: "Stratum Aero-Core",
    category: "CleanTech",
    tagline: "Distributed micro-wind generation telemetry unit.",
    description:
      "Deploys seamlessly across urban facades to harvest turbulent airflow, converting micro-gusts into stable grid power.",
    imageUrl:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop",
    supplier: "Stratum Labs",
    supplierInitials: "SA",
  },
  {
    id: "prod-5",
    name: "CryoLink Q-API",
    category: "DevTools",
    tagline: "Cloud-to-quantum middleware bridge for cryptography.",
    description:
      "Enables standard enterprise applications to execute hybrid classical-quantum cryptographic routines with microsecond latency.",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    supplier: "CryoLogic",
    supplierInitials: "CL",
  },
  {
    id: "prod-6",
    name: "Sentinel Edge Key",
    category: "SaaS / Hardware",
    tagline: "Zero-trust hardware authentication token with FIPS 140-3.",
    description:
      "Physical cryptographic hardware token designed to secure enterprise infrastructure against advanced persistent threats.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    supplier: "Sentinel Corp",
    supplierInitials: "SK",
  },
];

export default function Home() {
  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Immersive Hero Stage */}
      <section className="text-center relative pt-12 pb-20 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c9a978]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a978]/10 border border-[#c9a978]/20 text-[#c9a978] text-xs font-medium mb-8 backdrop-blur-md">
          <span className="text-sm">✨</span>
          <span>Premier Product Discovery & Showcase</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          You build the vision.
          <br />
          <span className="bg-gradient-to-r from-white via-zinc-200 to-[#c9a978] bg-clip-text text-transparent">
            We manage the tech.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          A curated ecosystem of bespoke clean-tech hardware, autonomous
          robotics, and advanced AI architectures designed for elite engineering
          teams.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#directory"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
          >
            Explore Directory
          </a>
          <Link
            href="/submit-product"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a978]/40 hover:bg-white/10 font-medium text-sm transition-all backdrop-blur-xl text-white"
          >
            + Add Product
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search hardware, micro-chips, renewable systems, or AI models..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#161619] border border-white/10 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#c9a978]/50 focus:ring-1 focus:ring-[#c9a978]/50 transition-all shadow-inner"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#c9a978] text-black shadow-md shadow-[#c9a978]/10">
              All Systems
            </button>
            {["CleanTech", "AI Hardware", "Robotics", "SaaS", "DevTools"].map(
              (cat) => (
                <button
                  key={cat}
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#161619] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Curated Index Section Header */}
      <div
        id="directory"
        className="flex items-end justify-between mb-8 border-b border-white/10 pb-4"
      >
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c9a978] font-semibold">
            Curated Index
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-white">
            Featured Hardware & Clean-Tech
          </h2>
        </div>
        <span className="text-xs text-zinc-500">
          Showing {featuredProducts.length} of 128 verified modules
        </span>
      </div>

      {/* Bento Grid (3-Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {/* Load More Trigger */}
      <div className="mt-16 text-center">
        <button className="px-8 py-3.5 rounded-xl bg-[#161619] border border-white/10 hover:border-[#c9a978]/40 hover:bg-[#1f1f23] text-xs font-semibold text-white transition-all shadow-lg">
          Load More Directory Entries
        </button>
      </div>
    </div>
  );
}