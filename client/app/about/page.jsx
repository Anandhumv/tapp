import Link from "next/link";
import { Sparkles, ShieldCheck, Users2, Layers, ArrowRight } from "lucide-react";

const values = [
  {
    title: "Curation over volume",
    description:
      "Every listing is reviewed before it goes live. We'd rather show fewer, better products than flood the directory.",
    icon: ShieldCheck,
  },
  {
    title: "Built for engineers",
    description:
      "Specs, architecture, and real technical detail come first — not marketing copy.",
    icon: Layers,
  },
  {
    title: "A living community",
    description:
      "Visitors ask questions, leave feedback, and help separate real breakthroughs from vaporware.",
    icon: Users2,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <section className="text-center relative pt-8 pb-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-accent/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-line text-accent text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About TAPP</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-heading leading-tight max-w-3xl mx-auto mb-6">
          A curated home for the hardware and clean-tech{" "}
          <em className="italic text-accent">that deserves attention</em>
        </h1>

        <p className="text-sm sm:text-base text-body max-w-2xl mx-auto leading-relaxed">
          TAPP is a discovery platform for bespoke hardware, clean-tech, autonomous
          systems, and AI architecture — reviewed by hand, not ranked by algorithm.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {values.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl bg-surface border border-line p-6 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-line text-accent flex items-center justify-center mb-5">
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-heading text-sm mb-1.5">{title}</h3>
            <p className="text-xs text-body leading-relaxed">{description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-surface border border-line p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading tracking-tight">
          Have something worth showcasing?
        </h2>
        <p className="text-sm text-body max-w-xl mx-auto leading-relaxed">
          Get in touch and our team will take a look.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-accent to-accent-strong text-black font-semibold text-sm hover:brightness-110 transition-all shadow-xl shadow-accent/20"
        >
          Get in Touch
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
