import Link from "next/link";
import { ArrowLeft, MessageSquare, Send, ShieldCheck, Calendar, User } from "lucide-react";

export default function ProductDetailPage({ params }) {
    // Placeholder mock data simulating fetched product by dynamic ID
    const product = {
        id: params.id,
        name: "SolarGrid Hybrid Inverter",
        category: "CleanTech",
        tagline: "Bifacial solar management with smart battery bank cutover",
        description:
            "The SolarGrid Hybrid Inverter bridges commercial solar arrays directly with high-capacity storage banks. Engineered with sub-millisecond islanding cutover, integrated MPPT trackers, and built-in surge arresters, this unit ensures maximum efficiency across fluctuating environmental loads.",
        imageUrl:
            "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
        specs: [
            { label: "Rated Power Output", value: "10 kW Continuous" },
            { label: "Peak Efficiency", value: "98.4% CEC Rated" },
            { label: "Operating Temperature", value: "-25°C to 60°C" },
            { label: "Grid Compliance", value: "IEEE 1547 / UL 1741" },
            { label: "Warranty", value: "10 Years Full Replacement" },
        ],
        submittedBy: "TechCore Innovations",
        submittedAt: "September 2026",
    };

    const dummyComments = [
        {
            id: "c1",
            author: "Vikram Menon",
            date: "2 days ago",
            text: "Does this unit support parallel installations for up to 50 kW requirements?",
        },
        {
            id: "c2",
            author: "Priya Sharma",
            date: "Yesterday",
            text: "We tested the earlier generation last quarter. The cutover latency is remarkably clean.",
        },
    ];

    return (
        <div className="space-y-10">
            {/* Back to Products Navigation */}
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to All Products</span>
            </Link>

            {/* Main Content Grid: Image on Left, Specs on Right */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                {/* Left Column: Product Media Preview */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover aspect-[16/10]"
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/30 p-4 text-xs text-neutral-400">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            <span>Verified Directory Listing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-neutral-500" />
                            <span>Added {product.submittedAt}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Title, Description, and Specs Table */}
                <div className="lg:col-span-5 space-y-6">
                    <div>
                        <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                            {product.category}
                        </span>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {product.name}
                        </h1>
                        <p className="mt-1 text-sm font-medium text-neutral-300">
                            {product.tagline}
                        </p>
                    </div>

                    <p className="text-sm leading-relaxed text-neutral-400">
                        {product.description}
                    </p>

                    {/* Specifications Table */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                            Technical Specifications
                        </h3>
                        <div className="divide-y divide-neutral-800 text-xs">
                            {product.specs.map((spec) => (
                                <div key={spec.label} className="flex justify-between py-2">
                                    <span className="text-neutral-400">{spec.label}</span>
                                    <span className="font-medium text-neutral-200">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Direct CTA Box */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 space-y-3">
                        <h4 className="text-sm font-semibold text-white">Interested in this product?</h4>
                        <p className="text-xs text-neutral-400">
                            Request formal pricing, technical datasheets, or schedule a direct consultation.
                        </p>
                        <button className="w-full rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors">
                            Request Supplier Contact / Quote
                        </button>
                    </div>
                </div>
            </div>

            {/* Discussion & Inquiries Section */}
            <section className="border-t border-neutral-800 pt-10 space-y-6 max-w-3xl">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    <h2 className="text-lg font-bold text-white">Community Inquiries & Feedback</h2>
                    <span className="ml-2 rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400">
                        {dummyComments.length}
                    </span>
                </div>

                {/* Comment Input Box */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-3">
                    <textarea
                        rows="3"
                        placeholder="Ask a question about deployment, specs, or compatibility..."
                        className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-neutral-200 placeholder-neutral-500 focus:border-blue-500 focus:outline-none"
                    ></textarea>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500">Posting as Guest User</span>
                        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-500 transition-colors">
                            <Send className="h-3.5 w-3.5" />
                            <span>Post Inquiry</span>
                        </button>
                    </div>
                </div>

                {/* Rendered Comments Feed */}
                <div className="space-y-4">
                    {dummyComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="rounded-lg border border-neutral-800/80 bg-neutral-900/30 p-4 space-y-1.5"
                        >
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5 text-neutral-500" />
                                    {comment.author}
                                </span>
                                <span className="text-neutral-500">{comment.date}</span>
                            </div>
                            <p className="text-sm text-neutral-400">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}