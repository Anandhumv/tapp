import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({ product }) {
    const { id, name, category, tagline, description, imageUrl } = product;

    return (
        <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900/80">
            <div>
                <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="mb-2">
                    <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                        {category}
                    </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {name}
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-300 line-clamp-1">
                    {tagline}
                </p>
                <p className="mt-2 text-xs text-neutral-400 line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800/60">
                <Link
                    href={`/products/${id}`}
                    className="flex items-center justify-between text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                >
                    <span>View Details & Specs</span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-blue-400 transition-transform" />
                </Link>
            </div>
        </div>
    );
}