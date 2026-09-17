import Link from "next/link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ProductCard({ product }) {
    const {
        id,
        name,
        category,
        tagline,
        imageUrl,
        supplier = "Verified Supplier",
        supplierInitials = "TS",
    } = product;

    return (
        <Link
            href={`/products/${id}`}
            className="group relative block rounded-2xl overflow-hidden aspect-[4/5] preview-card border border-line hover:border-line-hover shadow-xl"
        >
            {/* Media */}
            <img
                src={imageUrl}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gold ambient down-light */}
            <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-2/3 h-2/3 bg-accent/25 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Bottom overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Category badge */}
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-accent uppercase tracking-wider">
                {category}
            </span>

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                <h3 className="font-display text-xl font-semibold text-white leading-tight">
                    {name}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed line-clamp-2">{tagline}</p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold">
                            {supplierInitials}
                        </div>
                        <span className="text-[11px] text-white/60 font-medium">{supplier}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    </div>

                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
