import Link from "next/link";
import ProductCard from "../components/ProductCard";
import ThemeToggle from "../components/ThemeToggle";
import {
  Search,
  Play,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Users2,
  Boxes,
  Building2,
  ShieldCheck,
  Timer,
} from "lucide-react";

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

const capabilities = [
  {
    title: "Bespoke Sourcing",
    description: "Exotic compute & hardware, sourced directly.",
    icon: Cpu,
  },
  {
    title: "Systems Integration",
    description: "End-to-end architecture & firmware execution.",
    icon: Layers,
  },
  {
    title: "VIP Curation",
    description: "Priority review & front-page placement.",
    icon: Sparkles,
  },
  {
    title: "Executive Advisory",
    description: "Direct lines to investors & enterprise buyers.",
    icon: Users2,
  },
];

const stats = [
  { label: "Verified Modules", value: "128+", icon: Boxes },
  { label: "Elite Suppliers", value: "42+", icon: Building2 },
  { label: "Satisfaction Rate", value: "98%", icon: ShieldCheck },
  { label: "Curation Review", value: "24H", icon: Timer },
];

export default function Home() {
  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Left-side floating theme selector */}
      <ThemeToggle
        variant="floating"
        className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40"
      />

      {/* Immersive Hero Stage */}
      <section className="text-center relative pt-12 pb-20 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent-glow/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-line text-accent text-xs font-medium mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Premier Product Discovery & Showcase</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 text-heading">
          You build the <em className="italic text-accent">vision</em>.
          <br />
          We manage the <span className="font-script text-accent font-normal text-[1.15em] not-italic">tech</span>.
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-body max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          A curated ecosystem of bespoke clean-tech hardware, autonomous
          robotics, and advanced AI architectures designed for elite engineering
          teams.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#directory"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-strong text-black font-semibold text-sm hover:brightness-110 transition-all shadow-xl shadow-accent/20"
          >
            Discover Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/services"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-pill font-medium text-sm transition-all hover:border-line-hover text-heading"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/20 text-accent">
              <Play className="w-2.5 h-2.5 fill-current" />
            </span>
            Watch Tour
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-body">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search hardware, micro-chips, renewable systems, or AI models..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-surface border border-line text-sm text-heading placeholder-body focus:outline-none focus:border-line-hover focus:ring-1 focus:ring-accent/50 transition-all shadow-inner"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-accent to-accent-strong text-black shadow-md shadow-accent/10">
              All Systems
            </button>
            {["CleanTech", "AI Hardware", "Robotics", "SaaS", "DevTools"].map(
              (cat) => (
                <button
                  key={cat}
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-surface border border-line text-body hover:text-heading hover:border-line-hover transition-all"
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24 py-8 border-y border-line">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2">
            <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span className="font-display text-2xl sm:text-3xl font-bold text-heading">
              {value}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-body">{label}</span>
          </div>
        ))}
      </section>

      {/* Services / Capabilities Bento Grid */}
      <section id="ecosystem" className="mb-24">
        <div className="flex items-end justify-between mb-8 border-b border-line pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-accent font-semibold">
              Ecosystem
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-heading">
              Core Capabilities
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-semibold text-accent hover:text-accent-strong flex items-center gap-1"
          >
            View Services <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map(({ title, description, icon: Icon }) => (
            <Link
              key={title}
              href="/services"
              className="group relative rounded-2xl bg-surface border border-line hover:border-line-hover p-6 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-11 h-11 rounded-xl bg-accent/10 border border-line text-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="relative font-semibold text-heading text-sm mb-1.5">{title}</h3>
              <p className="relative text-xs text-body leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Curated Index Section Header */}
      <div
        id="directory"
        className="flex items-end justify-between mb-8 border-b border-line pb-4"
      >
        <div>
          <span className="text-[11px] uppercase tracking-widest text-accent font-semibold">
            Curated Index
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-heading">
            Featured Hardware & Clean-Tech
          </h2>
        </div>
        <span className="text-xs text-body">
          Showing {featuredProducts.length} of 128 verified modules
        </span>
      </div>

      {/* Featured Projects Showcase (3-Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {/* Load More Trigger */}
      <div className="mt-16 text-center">
        <button className="px-8 py-3.5 rounded-xl bg-surface border border-line hover:border-line-hover text-xs font-semibold text-heading transition-all shadow-lg">
          Load More Directory Entries
        </button>
      </div>
    </div>
  );
}
