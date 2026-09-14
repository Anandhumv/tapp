import Link from "next/link";
import { CheckCircle2, Bookmark } from "lucide-react";

export default function ProductCard({ product }) {
    const {
        id,
        name,
        category,
        tagline,
        description,
        imageUrl,
        supplier = "Verified Supplier",
        supplierInitials = "TS",
    } = product;

    return (
        <div className="group rounded-2xl bg-[#131316] border border-white/10 hover:border-[#c9a978]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl">
            <div>
                {/* Media Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-90" />

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#c9a978] uppercase tracking-wider">
                        {category}
                    </span>

                    <button
                        type="button"
                        className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white transition-colors"
                    >
                        <Bookmark className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#c9a978] transition-colors">
                        {name}
                    </h3>
                    <p className="text-xs font-medium text-zinc-300 mb-2">{tagline}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#c9a978]/20 text-[#c9a978] flex items-center justify-center text-[10px] font-bold">
                        {supplierInitials}
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">{supplier}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a978]" />
                </div>

                <Link
                    href={`/products/${id}`}
                    className="text-xs font-semibold text-[#c9a978] hover:underline flex items-center gap-1"
                >
                    Explore Specs &rarr;
                </Link>
            </div>
        </div>
    );
}