"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../../lib/cloudinary";
import {
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Sparkles,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
    "Clean-Tech & Energy",
    "Autonomous Robotics",
    "AI & Neural Hardware",
    "Spatial Computing",
    "Luxury Consumer Tech",
    "Developer Tools",
];

const PRICING_MODELS = [
    "Free",
    "Freemium",
    "Subscription",
    "Hardware Purchase",
    "Enterprise",
];

export default function SubmitProductPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [pricing, setPricing] = useState(PRICING_MODELS[0]);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [demoUrl, setDemoUrl] = useState("");

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage("Image size must be under 5MB.");
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!imageFile) {
            setErrorMessage("Please select a showcase image for your listing.");
            return;
        }

        setSubmitting(true);

        try {
            // 1. Upload to Cloudinary
            setUploadingImage(true);
            const imageUrl = await uploadToCloudinary(imageFile);
            setUploadingImage(false);

            // 2. Add document to Firestore
            await addDoc(collection(db, "products"), {
                title: title.trim(),
                tagline: tagline.trim(),
                description: description.trim(),
                category,
                pricing,
                websiteUrl: websiteUrl.trim(),
                demoUrl: demoUrl.trim() || null,
                imageUrl,
                userId: user.uid,
                userEmail: user.email,
                status: "pending",
                upvotesCount: 0,
                createdAt: serverTimestamp(),
            });

            setSuccess(true);
            setTimeout(() => {
                router.push("/");
            }, 2500);
        } catch (err) {
            console.error("Submission error:", err);
            setErrorMessage(err.message || "Failed to submit product.");
        } finally {
            setSubmitting(false);
            setUploadingImage(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-xs text-body">
                <Loader2 className="h-5 w-5 animate-spin text-accent mr-2" />
                Authenticating session...
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
                <div className="w-full max-w-lg rounded-2xl bg-surface border border-line-hover p-8 text-center shadow-2xl">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-accent mb-4 animate-bounce" />
                    <h2 className="font-display text-2xl font-bold text-heading mb-2">Submission Received</h2>
                    <p className="text-sm text-body mb-6">
                        Your hardware or platform solution has been entered into the moderation queue.
                    </p>
                    <div className="text-xs text-body">Redirecting to showcase...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl pt-28 pb-20 px-4">
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-xs text-body hover:text-accent transition-colors mb-4"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to directory</span>
                </Link>
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                        Curated Index
                    </span>
                </div>
                <h1 className="font-display text-3xl font-bold text-heading tracking-tight">
                    Submit Hardware or Platform
                </h1>
                <p className="mt-1 text-sm text-body">
                    List your next-generation hardware, clean-tech, or autonomous system on TAPP.
                </p>
            </div>

            <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-xs text-amber-600 dark:text-amber-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                    <strong>Review Policy:</strong> Submissions enter a <code>pending</code> status and require administrator approval before appearing in the public directory.
                </span>
            </div>

            {errorMessage && (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Product Title <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. AeroPulse Mark IV"
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Tagline <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            placeholder="e.g. Solid-state neural navigation drone"
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Category <span className="text-accent">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading focus:border-line-hover focus:outline-none"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Pricing Model <span className="text-accent">*</span>
                        </label>
                        <select
                            value={pricing}
                            onChange={(e) => setPricing(e.target.value)}
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading focus:border-line-hover focus:outline-none"
                        >
                            {PRICING_MODELS.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Official Website URL <span className="text-accent">*</span>
                        </label>
                        <input
                            type="url"
                            required
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            placeholder="https://company.com"
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                            Video / Demo URL <span className="text-body">(Optional)</span>
                        </label>
                        <input
                            type="url"
                            value={demoUrl}
                            onChange={(e) => setDemoUrl(e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                        Detailed Overview & Specifications <span className="text-accent">*</span>
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Outline architecture, hardware specifications, and core differentiators..."
                        className="w-full rounded-xl bg-surface border border-line px-4 py-2.5 text-sm text-heading placeholder-body/60 focus:border-line-hover focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-body mb-2">
                        Showcase Media (Hero Image) <span className="text-accent">*</span>
                    </label>
                    <div className="relative border-2 border-dashed border-line rounded-2xl p-6 bg-surface/50 hover:border-line-hover transition-colors">
                        {imagePreview ? (
                            <div className="space-y-4">
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-line">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-body truncate max-w-xs">
                                        {imageFile?.name}
                                    </span>
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer text-xs font-semibold text-accent hover:underline"
                                    >
                                        Change Image
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center justify-center py-6"
                            >
                                <div className="p-3 rounded-full bg-accent/10 border border-line text-accent mb-3">
                                    <UploadCloud className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium text-heading mb-1">
                                    Click to upload showcase image
                                </p>
                                <p className="text-xs text-body">PNG, JPG, or WEBP up to 5MB</p>
                            </label>
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-strong py-3.5 text-sm font-semibold text-black hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>
                                {uploadingImage
                                    ? "Uploading Media to Cloudinary..."
                                    : "Registering Product..."}
                            </span>
                        </>
                    ) : (
                        <span>Submit Solution for Moderation</span>
                    )}
                </button>
            </form>
        </div>
    );
}
