"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, AlertCircle } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";

export default function SubmitProductPage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return null;
    }

    return (
        <div className="mx-auto max-w-2xl py-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Submit a Solution
                </h1>
                <p className="mt-1 text-sm text-neutral-400">
                    List your hardware, software, or turnkey service on the platform. All submissions enter a pending verification queue before appearing on the public feed.
                </p>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-amber-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <span>
                    <strong>Moderation Policy:</strong> Submissions are reviewed by site administrators to maintain directory quality.
                </span>
            </div>

            <form className="space-y-6">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Product / Solution Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., AeroPulse Drone Pro"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/80 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                            Category <span className="text-red-400">*</span>
                        </label>
                        <select className="w-full rounded-lg border border-neutral-800 bg-neutral-900/80 px-3.5 py-2.5 text-sm text-neutral-200 focus:border-blue-500 focus:outline-none">
                            <option value="Hardware">Hardware</option>
                            <option value="CleanTech">CleanTech</option>
                            <option value="FinTech">FinTech</option>
                            <option value="AI Tool">AI Tool</option>
                            <option value="Productivity">Productivity</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                            Tagline <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Autonomous thermal diagnostics"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/80 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Description & Specs <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Describe technical capabilities, materials, and support options..."
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/80 p-3.5 text-sm text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Product Media <span className="text-red-400">*</span>
                    </label>
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-neutral-900/30 p-8 text-center">
                        <UploadCloud className="h-8 w-8 text-neutral-400 mb-2" />
                        <p className="text-sm text-neutral-300">Select or drop product image (Max 2MB)</p>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-4 text-xs text-neutral-400 file:mr-3 file:rounded file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-neutral-200"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                    Submit Product for Review
                </button>
            </form>
        </div>
    );
}